export default class MPSnippetModel {
    get id (): number {
        return this._id
    }

    get resourceUrl (): string {
        return this._resourceUrl
    }

    get name (): string {
        return this._name
    }

    private readonly _name
    private readonly _resourceUrl
    private readonly _id

    constructor (name: string, resourceUrl: string) {
        this._name = name
        this._resourceUrl = resourceUrl
        this._id = Math.ceil(Math.random() * 10000000) // TODO use UUID (0 is reserved for master)
    }
}
