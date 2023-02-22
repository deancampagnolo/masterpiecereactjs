import { TimeObject } from 'tone/build/esm/core/type/Units'

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

    get nudgeAmountObject (): TimeObject {
        return this._nudgeAmountObject
    }

    set nudgeAmountObject (nudgeAmountObject: TimeObject) {
        this._nudgeAmountObject = nudgeAmountObject
    }

    private readonly _audioLocalUUID
    private _name
    private _volume
    private _nudgeAmountObject

    constructor (name: string, volume?: number, nudgeAmountObject?: TimeObject) {
        this._name = name
        if (volume != null) {
            this._volume = volume
        } else {
            this._volume = 0
        }
        if (nudgeAmountObject != null) {
            this._nudgeAmountObject = nudgeAmountObject
        } else {
            this._nudgeAmountObject = {}
        }

        this._audioLocalUUID = Math.ceil(Math.random() * 10000000) // TODO use UUID (0 is reserved for master)
    }
}
