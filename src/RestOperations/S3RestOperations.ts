import axios from 'axios'
import { GetS3FilesURLGet, GetS3FilesURLPost } from './ServerRestOperations'

export const GetS3FileBlobURLs = async (filenames: string[]): Promise<string[] | null> => {
    const urls = await GetS3FilesURLGet(filenames)
    // console.log(urls)
    const blobUrls = []

    if (urls != null) {
        for (const url of urls) {
            const res = await axios.get(url, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'audio/mpeg'
                } // this doesn't seem to work for some reason
            })
            // console.log(res.data)

            const bloburl = URL.createObjectURL(res.data)
            // console.log(bloburl)
            blobUrls.push(bloburl)
        }

        return blobUrls
    }

    return null
}

export const PostS3Files = async (files: Blob[]): Promise<string[] | null> => {
    const fileNameAndUrls = await GetS3FilesURLPost(files.length)
    if (fileNameAndUrls === null) {
        console.error('file name or urls are null')
        return null
    }
    const fileNames = [] as string[]
    const urls = [] as string[]
    for (let i = 0; i < fileNameAndUrls.length; i++) {
        if (i % 2 === 0) {
            fileNames.push(fileNameAndUrls[i])
        } else {
            urls.push(fileNameAndUrls[i])
        }
    }
    let index = 0
    for (const url of urls) {
        const res = await axios.put(url, files[index], { headers: { 'Content-Type': 'audio/mpeg' } })
        console.log(res)
        index++
    } // FIXME: This is probably sequential https://stackoverflow.com/questions/66868195/running-for-loop-in-parallel-using-async-await-promises
    // TODO: verify that each async postS3File call works
    return fileNames
}
