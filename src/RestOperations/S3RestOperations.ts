import axios from 'axios'
import { GetS3FilesURLGet, GetS3FilesURLPost } from './ServerRestOperations'

export const GetS3FileBlobURL = async (filename: string): Promise<string | null> => {
    const url = await GetS3FilesURLGet(filename)
    if (url != null) {
        const res = await axios.get(url, {
            responseType: 'blob'
        })

        const bloburl = URL.createObjectURL(res.data)
        console.log(bloburl)
        return bloburl
    }

    return null
}

export const PostS3File = async (file: string): Promise<void> => {
    const url = await GetS3FilesURLPost()
    if (url != null) {
        const data = new FormData()

        data.append('file', file)

        const res = await axios.post(url, data)

        console.log(res)
    }
}
