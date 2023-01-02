import axios from "axios";
import {GetS3FilesURLGet, GetS3FilesURLPost} from "./ServerRestOperations";

export const GetS3FileBlobURL = async (filename: string) => {
    let url = await GetS3FilesURLGet(filename);
    if (url) {
        let res = await axios.get(url, {
            responseType: 'blob'
        });

        let bloburl = URL.createObjectURL(res.data)
        console.log(bloburl);
        return bloburl;
    }

    return null;
}

export const PostS3File = async (file: string) => {
    let url = await GetS3FilesURLPost();
    if (url) {
        const data = new FormData();

        data.append('file', file);

        let res = await axios.post(url, data);

        console.log(res);

    }
}
