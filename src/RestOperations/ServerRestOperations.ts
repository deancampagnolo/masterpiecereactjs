import MPContribution from './MasterpieceBackendContribution'
import axios from 'axios'
import { GetDomainName } from './RestOperationsUtil'
import MasterpieceFrontendContribution from './MasterpieceFrontendContribution'
import { plainToInstance } from 'class-transformer'

const masterpieceApiURL = GetDomainName() + '/api/v1/masterpiece'
const s3FilesApiURL = GetDomainName() + '/api/v1/s3Files'

const postMasterpiece = '/postMasterpiece'
const getMasterpieceData = '/getMasterpieceData'
const getRandomMasterpieceData = '/getRandomMasterpieceData'
const getUrlGet = '/urlGet'
const getUrlPostMp3s = '/urlPostMp3s'

export const PostMPContribution = async (mpContribution: MPContribution): Promise<void> => {
    // console.log('uploading masterpiece')

    const data = new FormData()
    Object.keys(mpContribution).forEach(key => { // @ts-expect-error FIXME
        data.append(key, mpContribution[key])
    }
    )
    const res2 = await axios.post(masterpieceApiURL + postMasterpiece, data)

    alert('This song\'s id is: ' + String(res2.data)) // TODO: Move to a different spot, this isn't a good place for this
    // console.log('status: ' + res2.status.toString())
}

export const GetS3FilesURLGet = async (filenames: string[]): Promise<string[] | null> => {
    // console.log('S3: getting s3 link for get')

    let filesInUrlListForm = ''
    filenames.forEach((value) => { filesInUrlListForm += value + ',' })
    filesInUrlListForm = filesInUrlListForm.slice(0, -1) // to remove last comma

    const res = await axios.get(s3FilesApiURL + getUrlGet + '/' + filesInUrlListForm)
    // console.log(res.status)

    if (typeof (res.data[0]) === 'string') {
        return res.data
    } else {
        console.error('data is not of type string')
        return null
    }
}

export const GetS3FilesURLPost = async (fileNum: number): Promise<string[] | null> => {
    // console.log('S3: getting s3 link for post')
    const res = await axios.get(s3FilesApiURL + getUrlPostMp3s + '/' + fileNum.toString())
    // console.log(res.status)
    // console.log(res.data[0])

    if (typeof (res.data[0]) === 'string') { // FIXME not correct checking done here
        return res.data
    } else {
        console.error('data is not of type string')
        return null
    }
}

export const GetMasterpieceData = async (id: number): Promise<MasterpieceFrontendContribution | null> => {
    // console.log('getting masterpiece data by id')

    const res = await axios.get(masterpieceApiURL + getMasterpieceData + '/' + id.toString())

    // console.log(res.status)
    const cls = MasterpieceFrontendContribution
    const contribution = plainToInstance(cls, res.data)
    // plainToInstance will return a MasterpieceFrontendContribution NOT MasterpieceFrontendContribution[] despite what the ide says
    // as a fail safe for this, return null if plainToInstance actually calls MasterpieceFrontendContribution[].
    // I'm pretty sure it is glitching because plainToInstance is an overloaded function that can also return the array version of it
    if (contribution instanceof MasterpieceFrontendContribution) {
        return contribution
    } else {
        return null
    }
}

export const GetRandomMasterpieceData = async (): Promise<void> => {
    // console.log('getting random masterpiece data')

    const res = await axios.get(masterpieceApiURL + getRandomMasterpieceData)

    console.log(res)
}
