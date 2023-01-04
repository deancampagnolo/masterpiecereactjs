import { GetS3FileBlobURL } from '../RestOperations/S3RestOperations'

export const GetS3Audio = async (setAudioUrl: any, filename: string): Promise<void> => {
    const blobUrl = await GetS3FileBlobURL(filename)
    if (blobUrl != null) {
        setAudioUrl(blobUrl)
    }
}
