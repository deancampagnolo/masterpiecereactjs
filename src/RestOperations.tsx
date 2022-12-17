import useAudio from "./Music";
import axios from "axios";
import MasterpieceContribution from "./MasterpieceContribution";

const domainName = 'http://localhost:8080';
//const domainName = 'https://mpbackendheroku.herokuapp.com';

const customerApiURL = domainName + '/api/v1/customer';
const masterpieceApiURL = domainName + '/api/v1/masterpiece';

// const customerApiURL =
//   'https://mpbackend-production.up.railway.app/api/v1/customer';

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

export const UploadFile = async (file: string) => {
    console.log('uploading file...');
    console.log(file);
    console.log("filed");
    // var input = document.querySelector('input[type="file"]')

    if (file != null) {
        const data = new FormData();
        data.append('file', file);
        console.log(data);

        let res2 = await axios.post("http://localhost:8080/uploadFile", data);
        console.log("status: " + res2.status);
    }
};

export const PostMasterpiece = async (mpContribution: MasterpieceContribution) => {
    console.log('uploading masterpiece');

    const data = new FormData();

    Object.keys(mpContribution).forEach(key =>
        // @ts-ignore
        data.append(key, mpContribution[key]),
    );
    let res2 = await axios.post(masterpieceApiURL + '/postMasterpiece', data);
    console.log("status: " + res2.status);

};

// export const FetchPhotoBlob = async setImageSrc => {
//     await RNFetchBlob.config({
//         // add this option that makes response data to be stored as a file,
//         // this is much more performant.
//         fileCache: true,
//     })
//         .fetch('get', 'http://localhost:8080/downloadFile/IMG_0011.JPG')
//         .then(res => {
//             // the temp file path
//             console.log('The file saved to ', res.path());
//             console.log(res);
//             setImageSrc(res.path());
//         });
// };



// export const GetMasterpiece = async () => {
//   console.log('get masterpiece');
//   fetch(masterpieceApiURL + '/getMasterpiece', {
//     method: 'get',
//     body: data,
//     headers: {
//       'Content-Type': 'multipart/form-data; ',
//     },
//   })
//
// }


