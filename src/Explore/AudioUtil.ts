import {PostMasterpiece} from "../RestOperations/ServerRestOperations";
import MasterpieceContribution from "../MasterpieceContribution";
import {GetS3FileBlobURL} from "../RestOperations/S3RestOperations";

export const GetS3Audio = async (setAudioUrl: any, filename: string) => {
    const blobUrl = await GetS3FileBlobURL(filename);
    if (blobUrl) {
        setAudioUrl(blobUrl);
    }
};
