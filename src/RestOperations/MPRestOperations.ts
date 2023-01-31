import MPWorkspaceContainerModel from '../Explore/Snippet/MPWorkspaceContainerModel'
import MPSnippetModel from '../Explore/Snippet/MPSnippetModel'
import { GetMasterpieceData, PostMPContribution } from './ServerRestOperations'
import { GetS3FileBlobURLs, PostS3Files } from './S3RestOperations'
import MasterpieceBackendContribution from './MasterpieceBackendContribution'
import AudioControllerModel from '../Explore/Utils/AudioControllerModel'

export const PostMP = async (urls: string[]): Promise<void> => {
    const convertLocalUrlsToBlob = async (urls: string[]): Promise<Blob[]> => {
        const files = [] as Blob[]
        for (const url of urls) {
            // fetch is used because it is getting local urls
            await fetch(url).then(async res => await res.blob().then(blob => files.push(blob)))
        }
        return files
    }
    const postMPContribution = async (s3Urls: string[] | null): Promise<void> => {
        if (s3Urls != null) {
            const mpContriubtion = new MasterpieceBackendContribution(99, 'pog', s3Urls)

            await PostMPContribution(mpContriubtion)
        } else {
            console.error('s3FileUrls are null')
        }
    }

    const files = await convertLocalUrlsToBlob(urls)
    const s3FileUrls = await PostS3Files(files)
    await postMPContribution(s3FileUrls)
}

export const FetchMP = async (mpID: number | null): Promise<MPWorkspaceContainerModel> => {
    const initializeLocalMP = (): string[] => {
        const urls = [] as string[]
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        urls.push(require('../9to5.mp3'))
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        urls.push(require('../9to5.mp3'))
        return urls
    }
    const getMPData = async (mpID: number | null): Promise<string[] | null> => {
        if (mpID != null) {
            return (mpID === 7) ? initializeLocalMP() : await getMPDataByID(mpID)
        } else {
            // await GetRandomMasterpieceData() // TODO
            return null
        }
    }
    const getMPDataByID = async (mpID: number): Promise<string[]> => {
        const urls = [] as string[]
        const mpFrontendContribution = await GetMasterpieceData(mpID)
        if (mpFrontendContribution?.pathsToAudio != null) {
            const files = await GetS3FileBlobURLs(mpFrontendContribution?.pathsToAudio)
            if (files != null) {
                files.forEach((value) => {
                    urls.push(value)
                })
            }
        }
        return urls
    }

    const audioControllerModel = new AudioControllerModel()
    const mpSnippetModels = [] as MPSnippetModel[]

    const urls = await getMPData(mpID)
    if (urls !== null) { // FIXME urls I dont think should ever be null, this is probably a consequence of random mp not being completed yet
        urls.forEach(url => {
            addAudio(audioControllerModel, mpSnippetModels, url)
        })
    }
    return new MPWorkspaceContainerModel(audioControllerModel, mpSnippetModels)
}

const addAudio = (audioControllerModel: AudioControllerModel, mpSnippetModels: MPSnippetModel[], resourceUrl: string): void => {
    const mpSnippetModel = new MPSnippetModel(resourceUrl)
    mpSnippetModels.push(mpSnippetModel)
    audioControllerModel.addAudio(mpSnippetModel.audioLocalUUID, resourceUrl, '0', '6m')
}
