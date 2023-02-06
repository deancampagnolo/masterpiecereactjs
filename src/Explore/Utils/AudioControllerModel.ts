import { loaded, Player, start, Transport } from 'tone'
import { Time } from 'tone/build/esm/core/type/Units'
import { Source } from 'tone/build/esm/source/Source'

class SourceWrapper {
    constructor (public source: Source<any>, public src: string) {}
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

    constructor () {
        Transport.bpm.value = 100
        Transport.loop = true
        Transport.loopStart = '0'
        Transport.loopEnd = '12m'
        this.audioControllerMap = new Map<number, SourceWrapper>()
        this.transportStateEmitter = new TransportStateEmitter()
    }

    addAudio (audioLocalUUID: number, src: string, start?: Time, stop?: Time): void {
        const player = new Player(src).toDestination().sync().start(start)
        if (stop !== undefined) {
            player.stop(stop)
        }
        this.audioControllerMap.set(audioLocalUUID, { source: player, src })
    }

    removeAudio (audioLocalUUID: number): boolean {
        const sourceWrapper = this.audioControllerMap.get(audioLocalUUID)
        if (sourceWrapper != null) {
            sourceWrapper.source.dispose()
            this.audioControllerMap.delete(audioLocalUUID)
            return true
        }
        console.error('Audio not correctly removed')
        return false
    }

    removeAllAudio (): void {
        console.log('here')
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
        const source = this.audioControllerMap.get(audioLocalUUID)?.source
        if (source != null) {
            source.mute = !source.mute
            return true
        }
        console.error('toggle Mute Audio source is undefined')
        return false
    }

    start (): void {
        void loaded().then(() => {
            void start().then(() => {
                console.log('started')
            })
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
