import { loaded, Player, start, Transport } from 'tone'
import { Time } from 'tone/build/esm/core/type/Units'
import { Source } from 'tone/build/esm/source/Source'

class SourceWrapper {
    constructor (public source: Source<any>, public src: string) {
    }
}

export default class AudioControllerModel {
    private readonly audioControllerMap

    constructor () {
        Transport.bpm.value = 100
        Transport.loop = true
        Transport.loopStart = '0'
        Transport.loopEnd = '8m'
        this.audioControllerMap = new Map<number, SourceWrapper>()
    }

    addAudio (audioLocalUUID: number, src: string, start?: Time, stop?: Time): void {
        const player = new Player(src).toDestination().sync().start(start).stop(stop)
        this.audioControllerMap.set(audioLocalUUID, { source: player, src })
    }

    removeAudio (audioLocalUUID: number): boolean {
        const sourceWrapper = this.audioControllerMap.get(audioLocalUUID)
        if (sourceWrapper != null) {
            sourceWrapper.source.disconnect()
            this.audioControllerMap.delete(audioLocalUUID)
            return true
        }
        return false
    }

    playMaster (): void {
        Transport.start()
    }

    start (): void {
        void loaded().then(() => {
            void start()
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
        this.audioControllerMap.clear()
    }
}
