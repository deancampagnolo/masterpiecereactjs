import AudioController from './AudioController'
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'

export default class AudioControllerModel {
    private readonly audioControllerMap
    private readonly ffmpeg

    constructor (ffmpeg: FFmpeg) {
        this.ffmpeg = ffmpeg
        this.audioControllerMap = new Map()
        this.audioControllerMap.set(0, new AudioController(''))
    }

    set (id: number, resourceUrl: string): void {
        this.audioControllerMap.set(id, new AudioController(resourceUrl))
        void this.refreshMaster()
    }

    get (id: number): AudioController {
        return this.audioControllerMap.get(id)
    }

    remove (id: number): void {
        this.audioControllerMap.delete(id)
        void this.refreshMaster() // TODO Make sure this actually works lol
    }

    reset (): void {
        this.audioControllerMap.clear()
        this.audioControllerMap.set(0, new AudioController(''))
    }

    async refreshMaster (): Promise<boolean> {
        // FIXME: refresh Master receives two inputs when 'next' button is initially hit
        console.log(this.audioControllerMap.size)
        if (this.ffmpeg.isLoaded() && this.audioControllerMap.size > 1) {
            const fileArgumentList: string[] = []
            for (const [key, value] of this.audioControllerMap.entries()) {
                if (key !== 0) {
                    const newFileName = key.toString().concat('.mp3')
                    this.ffmpeg.FS('writeFile', newFileName, await fetchFile(value.getUrl()))
                    fileArgumentList.push('-i', newFileName)
                }
            }

            await this.ffmpeg.run(...fileArgumentList, '-filter_complex', 'amix=inputs=' + (fileArgumentList.length / 2).toString() + ':duration=longest', '-preset', 'ultrafast', 'output.mp3')
            const data = this.ffmpeg.FS('readFile', 'output.mp3')
            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }))
            this.audioControllerMap.get(0).setAudio(url)
            return true
        } else {
            return false
        }
    }
}
