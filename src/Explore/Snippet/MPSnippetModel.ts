import AudioController from '../Utils/AudioController'

export default class MPSnippetModel {
    get id (): number {
        return this._id
    }

    get audioController (): AudioController {
        return this._audioController
    }

    get name (): string {
        return this._name
    }

    private readonly _name
    private readonly _audioController
    private readonly _id

    constructor (name: string, audioController: AudioController) {
        this._name = name
        this._audioController = audioController
        this._id = Math.floor(Math.random() * 10000000) // TODO use UUID
    }
}
