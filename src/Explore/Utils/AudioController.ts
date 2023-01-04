
export default class AudioController {
    private readonly audio

    constructor (audioUrl: string) {
        this.audio = new Audio(audioUrl)
    }

    async playAudio (): Promise<void> {
        await this.audio.play()
    }

    async pauseAudio (): Promise<void> {
        this.audio.pause()
    }
}
