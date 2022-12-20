import MasterpieceContribution from "../MasterpieceContribution";
import axios from "axios";
import {GetDomainName} from "./RestOperationsUtil";


const masterpieceApiURL = GetDomainName() + '/api/v1/masterpiece';

const postMasterpiece = '/postMasterpiece';
const getMasterpieceData = '/getMasterpieceData';


export const PostMasterpiece = async (mpContribution: MasterpieceContribution) => {
    console.log('uploading masterpiece');

    const data = new FormData();
    Object.keys(mpContribution).forEach(key =>
        // @ts-ignore
        data.append(key, mpContribution[key]),
    );
    let res2 = await axios.post(masterpieceApiURL + postMasterpiece, data);
    console.log("status: " + res2.status);
};

export const GetMasterpieceData = async () => {
    console.log('getting masterpiece data')

    let res = await axios.get(masterpieceApiURL + getMasterpieceData);

    console.log(res)
}
