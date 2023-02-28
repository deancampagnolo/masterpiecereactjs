import { TimeObject } from 'tone/build/esm/core/type/Units'

export default class MPSnippetModel {
    get s3FileUrl (): string | null {
        return this._s3FileUrl
    }

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
    private readonly _s3FileUrl
    private _volume
    private _nudgeAmountObject

    constructor (name: string, s3FileUrl: string | null, volume?: number, nudgeAmountObject?: TimeObject) {
        this._name = name
        this._s3FileUrl = s3FileUrl
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
