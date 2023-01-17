
export default class AudioController {
    private audio

    constructor (audioUrl: string) {
        this.audio = new Audio(audioUrl) // preload is default auto
    }

    async playAudio (): Promise<void> {
        await this.audio.play()
    }

    async pauseAudio (): Promise<void> {
        this.audio.pause()
    }

    getUrl (): string {
        return this.audio.src
    }

    setAudio (audioUrl: string): void {
        this.audio = new Audio(audioUrl)
    }
}
