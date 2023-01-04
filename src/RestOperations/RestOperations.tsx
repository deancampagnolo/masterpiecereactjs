import { GetDomainName } from './RestOperationsUtil'

const defaultApiURL = GetDomainName() + '/api/v1/default'

export const FetchPut = async (id: number): Promise<void> => {
    console.log('putting...')
    fetch(defaultApiURL + '/' + id.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => {
            console.log(resp.status)
        })
        .catch(e => {
            console.log(e)
        })
}

export const FetchAudioBlob = async (setAudioUrl: any): Promise<void> => {
    console.log('fetching audio blob')
    const res = await fetch('http://localhost:8080/downloadFile/abc.wav')
    const bloburl = URL.createObjectURL(await res.blob())

    setAudioUrl(bloburl)
}
