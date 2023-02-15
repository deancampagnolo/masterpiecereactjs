export default class MPSnippetModel {
    get audioLocalUUID (): number {
        return this._audioLocalUUID
    }

    get name (): string {
        return this._name
    }

    set name (name: string) {
        this._name = name
    }

    get volume (): number {
        return this._volume
    }

    set volume (value) {
        this._volume = value
    }

    private _name
    private _volume
    private readonly _audioLocalUUID

    constructor (name: string, volume?: number) {
        this._name = name
        if (volume != null) {
            this._volume = volume
        } else {
            this._volume = 0
        }

        this._audioLocalUUID = Math.ceil(Math.random() * 10000000) // TODO use UUID (0 is reserved for master)
    }
}
