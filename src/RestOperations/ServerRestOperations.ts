import MasterpieceContribution from '../MasterpieceContribution'
import axios from 'axios'
import { GetDomainName } from './RestOperationsUtil'

const masterpieceApiURL = GetDomainName() + '/api/v1/masterpiece'
const s3FilesApiURL = GetDomainName() + '/api/v1/s3Files'

const postMasterpiece = '/postMasterpiece'
const getMasterpieceData = '/getMasterpieceData'
const getUrlGet = '/urlGet'
const getUrlPost = '/urlPost'

export const PostMasterpiece = async (mpContribution: MasterpieceContribution): Promise<void> => {
    console.log('uploading masterpiece')

    const data = new FormData()
    Object.keys(mpContribution).forEach(key => { // @ts-expect-error FIXME
        data.append(key, mpContribution[key])
    }
    )
    const res2 = await axios.post(masterpieceApiURL + postMasterpiece, data)
    console.log('status: ' + res2.status.toString())
}

export const GetS3FilesURLGet = async (filename: string): Promise<string | null> => {
    console.log('S3: getting s3 link for get')

    const res = await axios.get(s3FilesApiURL + getUrlGet + '/' + filename)
    console.log(res.status)

    if (typeof (res.data) === 'string') {
        return res.data
    } else {
        console.error('data is not of type string')
        return null
    }
}

export const GetS3FilesURLPost = async (): Promise<string | null> => {
    const extension = '.mp3'
    console.log('S3: getting s3 link for post')
    const res = await axios.get(s3FilesApiURL + getUrlPost + '/' + extension)

    if (typeof (res.data) === 'string') {
        return res.data
    } else {
        console.error('data is not of type string')
        return null
    }
}

export const GetMasterpieceData = async (): Promise<void> => {
    console.log('getting masterpiece data')

    const res = await axios.get(masterpieceApiURL + getMasterpieceData)

    console.log(res)
}
