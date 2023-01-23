export default class MPSnippetModel {
    get audioLocalUUID (): number {
        return this._audioLocalUUID
    }

    get resourceUrl (): string {
        return this._resourceUrl
    }

    get name (): string {
        return this._name
    }

    private readonly _name
    private readonly _resourceUrl
    private readonly _audioLocalUUID

    constructor (name: string, resourceUrl: string) {
        this._name = name
        this._resourceUrl = resourceUrl
        this._audioLocalUUID = Math.ceil(Math.random() * 10000000) // TODO use UUID (0 is reserved for master)
    }
}
