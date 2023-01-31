import { GetDomainName } from './RestOperationsUtil'

const defaultApiURL = GetDomainName() + '/api/v1/default'

export const FetchPut = async (id: number): Promise<void> => {
    await fetch(defaultApiURL + '/' + id.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
}
