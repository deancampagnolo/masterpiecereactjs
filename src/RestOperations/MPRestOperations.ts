import MPWorkspaceContainerModel from '../Explore/Snippet/MPWorkspaceContainerModel'
import MPSnippetModel from '../Explore/Snippet/MPSnippetModel'
import AudioControllerModel from '../Explore/Utils/AudioControllerModel'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { GetMasterpieceData, GetRandomMasterpieceData, PostMPContribution } from './ServerRestOperations'
import { GetS3FileBlobURLs, PostS3Files } from './S3RestOperations'
import MasterpieceBackendContribution from './MasterpieceBackendContribution'

export const PostMP = async (urls: string[]): Promise<void> => {
    const files = [] as Blob[]

    for (const url of urls) {
        // fetch is used because it is getting local urls
        await fetch(url).then(async res => await res.blob().then(blob => files.push(blob)))
    }
    let newS3Urls = [] as (string[] | null)
    await PostS3Files(files).then(newUrls => { newS3Urls = newUrls })

    if (newS3Urls != null) {
        const mpContriubtion = new MasterpieceBackendContribution(99, 'pog', newS3Urls)

        await PostMPContribution(mpContriubtion)
    } else {
        console.error('newS3Urls are null')
    }
    // step 1 get post url from MPBackend x
    // step 2 post audio to s3 x
    // step 3 post string urls to MPBackendx
}

export const FetchMP = async (mpID: number | null, ffmpeg: FFmpeg): Promise<MPWorkspaceContainerModel> => {
    const audioControllerModel = new AudioControllerModel(ffmpeg)
    const mpSnippetModels = [] as MPSnippetModel[]
    const urls: string[] = []
    if (mpID === 7) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
        urls.push(require('../9to5.mp3'))
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        urls.push(require('../9to5.mp3'))
    } else {
        if (mpID != null) {
            const mpFrontendContribution = await GetMasterpieceData(mpID)
            if (mpFrontendContribution?.pathsToAudio != null) {
                const files = await GetS3FileBlobURLs(mpFrontendContribution?.pathsToAudio)
                if (files != null) {
                    files.forEach((value) => {
                        urls.push(value)
                    })
                }
            }
        } else {
            await GetRandomMasterpieceData() // TODO
        }
    }
    urls.forEach(url => { addAudio(audioControllerModel, mpSnippetModels, url) })
    return new MPWorkspaceContainerModel(audioControllerModel, mpSnippetModels)
}

const addAudio = (audioControllerModel: AudioControllerModel, mpSnippetModels: MPSnippetModel[], resourceUrl: string): void => {
    const mpSnippetModel = new MPSnippetModel(resourceUrl, resourceUrl)
    mpSnippetModels.push(mpSnippetModel)
    audioControllerModel.set(mpSnippetModel.audioLocalUUID, resourceUrl, false)
}
