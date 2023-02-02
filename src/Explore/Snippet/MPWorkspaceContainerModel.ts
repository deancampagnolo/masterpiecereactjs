import MPSnippetModel from './MPSnippetModel'
import AudioControllerModel, { AudioControllerModelHelper } from '../Utils/AudioControllerModel'

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

    static BlankMPWorkspaceContainerModel (): MPWorkspaceContainerModel {
        return new MPWorkspaceContainerModel(AudioControllerModelHelper.getInstance(), [])
    }
}
