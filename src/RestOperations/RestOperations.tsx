import axios from "axios";
import {GetDomainName} from "./RestOperationsUtil";

const customerApiURL = GetDomainName() + '/api/v1/customer';

export const FetchGet = async () => {
    console.log('fetching...');
    fetch(customerApiURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(resp => {
        resp.json().then(ob => console.log(ob));
    });
};

export const FetchPut = async (id: number) => {
    console.log('putting...');
    fetch(customerApiURL + '/' + id, {
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
