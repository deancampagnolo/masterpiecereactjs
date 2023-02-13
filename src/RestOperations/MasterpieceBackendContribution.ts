import MasterpieceSnippetContribution from './MasterpieceSnippetContribution'
import MasterpieceDataContribution from './MasterpieceDataContribution'

export default class MasterpieceBackendContribution {
    constructor (public dataContribution: MasterpieceDataContribution, public snippetContributions: MasterpieceSnippetContribution[]) {}
}
