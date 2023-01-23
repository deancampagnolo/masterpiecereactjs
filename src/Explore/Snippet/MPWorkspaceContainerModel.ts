import AudioControllerModel from '../Utils/AudioControllerModel'
import MPSnippetModel from './MPSnippetModel'

export default class MPWorkspaceContainerModel { // FIXME this name doesn't seem correct
    private readonly _audioControllerModel
    private readonly _mpSnippetModels
    constructor (audioControllerModel: AudioControllerModel, mpSnippetModels: MPSnippetModel[]) {
        this._audioControllerModel = audioControllerModel
        this._mpSnippetModels = mpSnippetModels
    }

    get audioControllerModel (): AudioControllerModel {
        return this._audioControllerModel
    }

    get mpSnippetModels (): MPSnippetModel[] {
        return this._mpSnippetModels
    }
}
