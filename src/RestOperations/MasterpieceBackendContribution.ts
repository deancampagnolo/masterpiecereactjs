import MasterpieceSnippetContribution from './MasterpieceSnippetContribution'

export default class MasterpieceBackendContribution {
    constructor (public songId: number, public title: string, public snippetContributions: MasterpieceSnippetContribution[]) {}
}
