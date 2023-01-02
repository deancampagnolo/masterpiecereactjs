import {GetDomainName} from "./RestOperationsUtil";
import {GetS3FilesURLGet} from "./ServerRestOperations";
import {GetS3FileBlobURL} from "./S3RestOperations";

const defaultApiURL = GetDomainName() + '/api/v1/default';

export const FetchPut = async (id: number) => {
    console.log('putting...');
    fetch(defaultApiURL + '/' + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
    })
        .then(resp => {
            console.log(resp.status);
        })
        .catch(e => {
            console.log(e);
        });
};

export const FetchAudioBlob = async (setAudioUrl: any) => {

    console.log("fetching audio blob")
    let res = await fetch('http://localhost:8080/downloadFile/abc.wav')
    let bloburl = URL.createObjectURL(await res.blob())

    setAudioUrl(bloburl);
};
