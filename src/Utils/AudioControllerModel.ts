import { Channel, loaded, Player, Recorder, start, Time, Transport } from 'tone'
import { Subdivision, Time as TimeUnit, TimeObject, TransportTime } from 'tone/build/esm/core/type/Units'
import fileDownload from 'js-file-download'

export class TimeMap {
    private readonly timeMap
    constructor (map?: Map<Subdivision, number>, nudgeObject?: TimeObject) {
        if (map != null) {
            this.timeMap = map
        } else if (nudgeObject != null) {
            this.timeMap = this.nudgeObjectToMap(nudgeObject)
        } else {
            this.timeMap = new Map<Subdivision, number>()
        }
    }

    private nudgeObjectToMap (nudgeObject: TimeObject): Map<Subdivision, number> {
        const newMap = new Map<Subdivision, number>()
        Object.entries(nudgeObject).forEach((value, index, array) => {
            // @ts-expect-error
            newMap.set(value[0], value[1])
        })
        return newMap
    }

    add (sub: Subdivision, num: number): void {
        if (this.timeMap.has(sub)) {
            const prevNum = this.timeMap.get(sub)
            if (prevNum != null) {
                this.timeMap.set(sub, prevNum + num)
            }
        } else {
            this.timeMap.set(sub, num)
        }
    }

    private invert (): void {
        this.timeMap.forEach((value, key, map) => {
            map.set(key, value * -1)
        })
    }

    createNewInvertedMap (): TimeMap {
        const newTimeMap = new TimeMap(new Map(this.timeMap))
        newTimeMap.invert()
        return newTimeMap
    }

    toSeconds (): number {
        return Time(this.getObject()).toSeconds()
    }

    getObject (): TimeObject {
        return Object.fromEntries(this.timeMap)
    }
}

class ChannelWrapper {
    constructor (public channel: Channel, public player: Player, public src: string, public timeMap: TimeMap, public recorder?: Recorder) {}
}

class MasterWrapper {
    constructor (public channel: Channel, public recorder?: Recorder) {}
}

export enum NudgeType {
    VeryLeft,
    Left,
    VeryRight,
    Right
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AudioControllerModelHelper {
    private static _instance: AudioControllerModel
    public static getInstance (): AudioControllerModel {
        if (this._instance == null) {
            this._instance = new AudioControllerModel()
        }
        return this._instance
    }
}

class TransportProgressEmitter {
    listeners = [] as Array<(progress: number) => void>
    constructor (transport: typeof Transport) {
        setInterval(() => {
            this.listeners.forEach(
                (callback) => {
                    callback(transport.progress)
                }
            )
            // there might seem like a memory leak from here, but I think its garbage collected eventually
            // https://stackoverflow.com/questions/14034107/does-javascript-setinterval-method-cause-memory-leak
        }, 16)
    }

    on (callback: (progress: number) => void): void {
        this.listeners.push(callback)
    }

    reset (): void {
        this.listeners = []
    }
}

class TransportStateEmitter {
    listeners = [] as Array<(arg0: boolean) => void>
    emit (isPlaying: boolean): void {
        this.listeners
            .forEach(
                (callback) => {
                    // eslint-disable-next-line n/no-callback-literal
                    callback(isPlaying)
                }
            )
    }

    on (callback: (arg0: boolean) => void): void {
        this.listeners.push(callback)
    }

    reset (): void {
        this.listeners = []
    }
}

export default class AudioControllerModel {
    private readonly audioControllerMap
    private readonly transportStateEmitter
    private readonly transportProgressEmitter
    private readonly masterChannel

    constructor () { // this maybe should be protected
        Transport.bpm.value = 100
        Transport.loop = true
        Transport.loopStart = '0'
        Transport.loopEnd = '12m'
        this.audioControllerMap = new Map<number, ChannelWrapper>()
        this.transportStateEmitter = new TransportStateEmitter()
        this.transportProgressEmitter = new TransportProgressEmitter(Transport)
        this.masterChannel = new MasterWrapper(new Channel().toDestination())
    }

    addAudio (audioLocalUUID: number, src: string, timeMap?: TimeMap): void {
        if (timeMap == null) {
            timeMap = new TimeMap()
        }
        const player = new Player(src).sync().start(timeMap.getObject())
        const channel = new Channel()
        player.connect(channel)
        channel.connect(this.masterChannel.channel)
        this.audioControllerMap.set(audioLocalUUID, { channel, player, src, timeMap })
    }

    removeAudio (audioLocalUUID: number): boolean {
        const sourceWrapper = this.audioControllerMap.get(audioLocalUUID)
        if (sourceWrapper != null) {
            sourceWrapper.channel.dispose() // TODO Not 100% sure if this disposes associated source (I dont think it does)
            this.audioControllerMap.delete(audioLocalUUID)
            return true
        }
        console.error('Audio not correctly removed')
        return false
    }

    removeAllAudio (): void {
        for (const [key] of this.audioControllerMap.entries()) {
            this.removeAudio(key)
        }
    }

    toggleMaster (shouldHaveStartDelay?: boolean): void {
        // note: be careful start() to here and other pause/start/etc. as some events are time based off of these
        if (Transport.state === 'started') {
            this.pauseMaster()
        } else {
            this.startMaster(undefined, undefined, shouldHaveStartDelay)
        }
    }

    pauseMaster (): void {
        Transport.pause()
        this.emitTransportStateChanged(false)
    }

    startMaster (time?: TimeUnit, offset?: TransportTime, shouldHaveStartDelay?: boolean): void {
        // note: be careful start() to here and other pause/start/etc. as some events are time based off of these
        const startIt = (): void => {
            Transport.start(time, offset)
            this.emitTransportStateChanged(true)
        }

        if (shouldHaveStartDelay === true) {
            this.start().then(() => {
                startIt()
            }).catch(() => { console.error('start didnt work') })
        } else {
            startIt()
        }
    }

    onTransportProgressUpdated (callback: (progress: number) => void): void {
        this.transportProgressEmitter.on(callback)
    }

    onTransportStateChanged (callback: (arg0: boolean) => void): void {
        this.transportStateEmitter.on(callback)
    }

    clearTransportStateEmitter (): void {
        this.transportStateEmitter.reset()
    }

    emitTransportStateChanged (isPlaying: boolean): void {
        this.transportStateEmitter.emit(isPlaying)
    }

    toggleMuteAudio (audioLocalUUID: number): boolean {
        const channel = this.audioControllerMap.get(audioLocalUUID)?.channel
        if (channel != null) {
            channel.mute = !channel.mute
            return true
        }
        console.error('toggle Mute Audio source is undefined')
        return false
    }

    setNudgeObject (audioLocalUUID: number, nudgeObject: TimeObject): void {
        const channelWrapper = this.audioControllerMap.get(audioLocalUUID)
        if (channelWrapper != null) {
            channelWrapper.timeMap = new TimeMap(undefined, nudgeObject)
            this.syncNudge(channelWrapper.player, channelWrapper.timeMap)
        }
    }

    nudgeAudio (audioLocalUUID: number, nudge: NudgeType): TimeObject | null {
        const channelWrapper = this.audioControllerMap.get(audioLocalUUID)
        if (channelWrapper != null) {
            const player = channelWrapper.player
            const timeMap = channelWrapper.timeMap

            switch (nudge) {
                case NudgeType.Left: {
                    timeMap.add('64n', -1)
                    break
                }
                case NudgeType.VeryLeft: {
                    timeMap.add('16n', -1)
                    break
                }
                case NudgeType.Right: {
                    timeMap.add('64n', 1)
                    break
                }
                case NudgeType.VeryRight: {
                    timeMap.add('16n', 1)
                    break
                }
            }
            this.syncNudge(player, timeMap)
            return timeMap.getObject()
        } else {
            console.error('player is null')
            return null
        }
    }

    private syncNudge (player: Player, timeMap: TimeMap): void {
        if (timeMap.toSeconds() < 0) {
            player.unsync().sync().start(0, timeMap.createNewInvertedMap().getObject())
        } else {
            player.unsync().sync().start(timeMap.getObject())
        }
    }

    setVolume (audioLocalUUID: number, dbs: number): void {
        const channel = this.audioControllerMap.get(audioLocalUUID)?.channel
        if (channel != null) {
            channel.volume.value = this.sliderToDB(dbs)
        }
    }

    setMasterVolume (dbs: number): void {
        this.masterChannel.channel.volume.value = dbs
    }

    sliderToDB (num: number): number {
        return (num <= -59) ? -Infinity : num
    }

    startAtPercent (percent: number): void {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const seconds = Math.round(Number(Transport.loopEnd.valueOf().toString()) * percent * 10) / 10
        // console.log(seconds)
        Transport.stop()
        this.startMaster('+.1', '+' + seconds.toString(), true) // FIXME there is a race condition here with stop() thats why there is .1s delay on it
    }

    private createRecorders (): Array<Promise<unknown>> {
        // This can be confusing - promise array needs await because it is in an async function, when adding the
        // master recorder this isn't the case bc it isn't a function and start() returns a promise.
        // TODO there may need to be clean up for the channel connecting, maybe i need to dispose afterwards?
        const promiseArray = Array.from(this.audioControllerMap).map(async ([, value]) => {
            value.recorder = new Recorder()
            value.channel.connect(value.recorder)
            return await value.recorder.start()
        })
        this.masterChannel.recorder = new Recorder()
        this.masterChannel.channel.connect(this.masterChannel.recorder)
        promiseArray.push(this.masterChannel.recorder.start())

        return promiseArray
    }

    private stopRecordersAndDownload (): Array<Promise<unknown>> {
        // same note as create recorders
        const promiseArray = Array.from(this.audioControllerMap).map(async ([key, value]) => {
            if (value.recorder != null) {
                await value.recorder.stop().then((res) => { fileDownload(res, key.toString()) })
            }
        })
        if (this.masterChannel.recorder != null) {
            promiseArray.push(this.masterChannel.recorder.stop().then((res) => {
                fileDownload(res, 'master')
            }))
        }
        return promiseArray
    }

    async startRecord (): Promise<Promise<any>> {
        this.startMaster('+1', '0', true)

        Transport.once('start', () => {
            Transport.scheduleOnce(() => {
                this.pauseMaster()
                Promise.all(this.createRecorders()).then(() => { this.startMaster() }).catch(() => {}) // There may be race condition shenanigans here
            }, '0')
        })

        await new Promise((resolve, reject) => {
            Transport.once('loopEnd', () => {
                this.stopRecord().then(() => { resolve('foo') })
                    // eslint-disable-next-line prefer-promise-reject-errors
                    .catch(() => { reject('stop record didnt work') })
            })
        })
    }

    async stopRecord (): Promise<void> {
        await Promise.all(
            this.stopRecordersAndDownload()
        )
    }

    async start (): Promise<void> {
        await loaded().then(async () => {
            await start().then(() => {
                console.log('started')
            }) // not entirely sure if this also waits for start to finish before returning promise
        })
    }

    getAllUrl (): string[] {
        const urls = [] as string[]
        for (const [key, value] of this.audioControllerMap.entries()) {
            if (key !== 0) {
                urls.push(value.src)
            }
        }
        return urls
    }

    clear (): void {
        Transport.cancel()
        this.removeAllAudio()
    }
}
