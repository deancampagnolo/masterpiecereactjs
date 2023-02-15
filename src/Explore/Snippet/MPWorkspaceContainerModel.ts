import MPSnippetModel from './MPSnippetModel'
import AudioControllerModel, { AudioControllerModelHelper } from '../../Utils/AudioControllerModel'
import MPModel from './MPModel'

export default class MPWorkspaceContainerModel { // FIXME this name doesn't seem correct
    private readonly _audioControllerModel
    private readonly _mpSnippetModels
    private readonly _mpModel
    constructor (audioControllerModel: AudioControllerModel, mpSnippetModels: MPSnippetModel[], mpModel: MPModel) {
        this._audioControllerModel = audioControllerModel
        this._mpSnippetModels = mpSnippetModels
        this._mpModel = mpModel
    }

    get audioControllerModel (): AudioControllerModel {
        return this._audioControllerModel
    }

    get mpSnippetModels (): MPSnippetModel[] {
        return this._mpSnippetModels
    }

    get mpModel (): MPModel {
        return this._mpModel
    }

    static BlankMPWorkspaceContainerModel (): MPWorkspaceContainerModel {
        return new MPWorkspaceContainerModel(AudioControllerModelHelper.getInstance(), [], MPModel.BlankMPModel())
    }
}
