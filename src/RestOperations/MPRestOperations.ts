import MPWorkspaceContainerModel from '../Explore/Snippet/MPWorkspaceContainerModel'
import MPSnippetModel from '../Explore/Snippet/MPSnippetModel'
import { GetMasterpieceData, PostMPContribution } from './ServerRestOperations'
import { GetS3FileBlobURLs, PostS3Files } from './S3RestOperations'
import MasterpieceBackendContribution from './MasterpieceBackendContribution'
import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'
import MasterpieceSnippetContribution from './MasterpieceSnippetContribution'
import MPModel from '../Explore/Snippet/MPModel'
import MasterpieceDataContribution from './MasterpieceDataContribution'
import { TimeObject } from 'tone/build/esm/core/type/Units'

export const PostMP = async (localUrls: string[], snippetControllers: MPSnippetModel[], mpModel: MPModel): Promise<void> => {
    const convertLocalUrlsToBlob = async (urls: string[]): Promise<Blob[]> => {
        const files = [] as Blob[]
        for (const url of urls) {
            // fetch is used because it is getting local localUrls
            await fetch(url).then(async res => await res.blob().then(blob => files.push(blob)))
        }
        return files
    }
    const createMasterpieceBackendContribution = (s3Urls: string[], mpSnippetModels: MPSnippetModel[], mpModel: MPModel): MasterpieceBackendContribution => {
        const snippetContributions = [] as MasterpieceSnippetContribution[]
        s3Urls?.forEach((value, index) => {
            snippetContributions.push(new MasterpieceSnippetContribution(value, mpSnippetModels[index].name,
                mpSnippetModels[index].volume, JSON.stringify(mpSnippetModels[index].nudgeAmountObject)))
        })
        const dataContribution = new MasterpieceDataContribution(99, mpModel.title, mpModel.neededInstruments, mpModel.bpm, mpModel.key)
        return new MasterpieceBackendContribution(dataContribution, snippetContributions)
    }

    // const localUrls = snippetData.map((value) => { return value.localSrc })
    const files = await convertLocalUrlsToBlob(localUrls)
    const s3FileUrls = await PostS3Files(files)
    if (s3FileUrls != null) {
        await PostMPContribution(createMasterpieceBackendContribution(s3FileUrls, snippetControllers, mpModel))
    } else {
        console.error('s3Files are null')
    }
}

export const FetchMP = async (mpID: number): Promise<MPWorkspaceContainerModel> => {
    const audioControllerModel = AudioControllerModelHelper.getInstance()
    const mpSnippetModels = [] as MPSnippetModel[]

    const mpBackendContribution = await GetMasterpieceData(mpID)
    const pathsToAudio = mpBackendContribution?.snippetContributions.map((value) => value.src)
    const titles = mpBackendContribution?.snippetContributions.map((value) => value.snippetTitle)
    const volumes = mpBackendContribution?.snippetContributions.map((value) => Number(value.volume))
    const nudges = mpBackendContribution?.snippetContributions.map((value) => value.nudgeAmountObject)
    const urls = [] as string[]
    if (pathsToAudio != null) {
        const files = await GetS3FileBlobURLs(pathsToAudio)
        if (files != null) {
            files.forEach((value) => {
                urls.push(value)
            })
        }
    }
    audioControllerModel.removeAllAudio()
    if (urls != null && titles != null && volumes != null && nudges != null) { // FIXME urls I dont think should ever be null, this is probably a consequence of random mp not being completed yet
        console.log(nudges)
        urls.forEach((url: string, index) => {
            const timeObject: TimeObject = JSON.parse(nudges[index]) as TimeObject // FIXME I'm pretty sure this is a fairly unsafe cast
            const mpSnippetModel = new MPSnippetModel(titles[index], volumes[index], timeObject)
            mpSnippetModels.push(mpSnippetModel)
            audioControllerModel.addAudio(mpSnippetModel.audioLocalUUID, url)
        })
    }

    const createMPModel = (backendContribution: MasterpieceBackendContribution | null): MPModel => {
        if (backendContribution != null) {
            const dataContribution = backendContribution.dataContribution
            return new MPModel(dataContribution.title, dataContribution.neededInstruments, dataContribution.bpm, dataContribution.key)
        } else {
            return MPModel.BlankMPModel()
        }
    }

    return new MPWorkspaceContainerModel(audioControllerModel, mpSnippetModels, createMPModel(mpBackendContribution))
}
