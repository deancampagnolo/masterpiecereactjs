import { Channel, loaded, Player, start, Transport } from 'tone'
import { Time } from 'tone/build/esm/core/type/Units'

class ChannelWrapper {
    constructor (public channel: Channel, public src: string) {}
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
    private readonly masterChannel

    constructor () {
        Transport.bpm.value = 100
        Transport.loop = true
        Transport.loopStart = '0'
        Transport.loopEnd = '12m'
        this.audioControllerMap = new Map<number, ChannelWrapper>()
        this.transportStateEmitter = new TransportStateEmitter()
        this.masterChannel = new Channel().toDestination()
    }

    addAudio (audioLocalUUID: number, src: string, start?: Time, stop?: Time): void {
        const player = new Player(src).sync().start(start)
        if (stop !== undefined) {
            player.stop(stop)
        }
        const channel = new Channel()
        player.connect(channel)
        channel.connect(this.masterChannel)
        this.audioControllerMap.set(audioLocalUUID, { channel, src })
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

    toggleMaster (): void {
        if (Transport.state === 'started') {
            Transport.pause()
            this.emitTransportStateChanged(false)
        } else {
            Transport.start()
            this.emitTransportStateChanged(true)
        }
    }

    pauseMaster (): void {
        Transport.pause()
        this.emitTransportStateChanged(false)
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

    setVolume (audioLocalUUID: number, dbs: number): void {
        const channel = this.audioControllerMap.get(audioLocalUUID)?.channel
        if (channel != null) {
            channel.volume.value = this.sliderToDB(dbs)
        }
    }

    setMasterVolume (dbs: number): void {
        this.masterChannel.volume.value = dbs
    }

    sliderToDB (num: number): number {
        return (num <= -60) ? -Infinity : num
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
