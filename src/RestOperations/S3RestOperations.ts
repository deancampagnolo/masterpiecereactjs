import axios from 'axios'
import { GetS3FilesURLGet, GetS3FilesURLPost, GetS3FilesURLPostz } from './ServerRestOperations'

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
    const url = await GetS3FilesURLPostz()
    if (url != null) {
        const data = new FormData()

        data.append('file', file)
        console.log(url)

        const res = await axios.put(url, data)

        console.log(res)
    }
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
        const data = new FormData()
        data.append('file', files[index])

        const res = await axios.put(url, data)

        console.log(res)
        index++
    } // FIXME: This is probably sequential https://stackoverflow.com/questions/66868195/running-for-loop-in-parallel-using-async-await-promises
    // TODO: verify that each async postS3File call works
    return fileNames
}
