import MPContribution from '../MasterpieceContribution'
import axios from 'axios'
import { GetDomainName } from './RestOperationsUtil'

const masterpieceApiURL = GetDomainName() + '/api/v1/masterpiece'
const s3FilesApiURL = GetDomainName() + '/api/v1/s3Files'

const postMasterpiece = '/postMasterpiece'
const getMasterpieceData = '/getMasterpieceData'
const getRandomMasterpieceData = '/getRandomMasterpieceData'
const getUrlGet = '/urlGet'
const getUrlPostMp3s = '/urlPostMp3s'

export const PostMPContribution = async (mpContribution: MPContribution): Promise<void> => {
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

export const GetS3FilesURLPostz = async (): Promise<string | null> => {
    console.log('S3: getting s3 link for post')
    const res = await axios.get(s3FilesApiURL + getUrlPostMp3s + '/' + '1')

    if (typeof (res.data[0]) === 'string') {
        return res.data[0]
    } else {
        console.error('data is not of type string')
        return null
    }
}

export const GetS3FilesURLPost = async (fileNum: number): Promise<string[] | null> => {
    // const res2 = await axios.get(s3FilesApiURL + '/test')
    // console.log(res2.status)

    console.log('S3: getting s3 link for post')
    const res = await axios.get(s3FilesApiURL + getUrlPostMp3s + '/' + fileNum.toString())
    console.log(res.status)
    console.log(res.data[0])

    if (typeof (res.data[0]) === 'string') { // FIXME not correct checking done here
        return res.data
    } else {
        console.error('data is not of type string')
        return null
    }
}

export const GetMasterpieceData = async (id: number): Promise<void> => {
    console.log('getting masterpiece data by id')

    const res = await axios.get(masterpieceApiURL + getMasterpieceData + '/' + id.toString())

    console.log(res)
}

export const GetRandomMasterpieceData = async (): Promise<void> => {
    console.log('getting random masterpiece data')

    const res = await axios.get(masterpieceApiURL + getRandomMasterpieceData)

    console.log(res)
}
