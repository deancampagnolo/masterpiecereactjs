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
