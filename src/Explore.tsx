import {FetchAudioBlob, FetchGet, FetchPut, UploadFile} from "./RestOperations";
import React, {useState} from "react";
import Chooser from "./Chooser";

export default function Explore() {
    // const [imageSrc, setImageSrc] = useState();
    // const [text, setText] = useState();
    const [audioUrl, setAudioUrl] = useState(require("./9to5.mp3"));
    // setAudioUrl(require("./9to5.mp3"));
    // useEffect(() => {
    //   FetchGetFile(setImageSrc);
    // }, []);

    const PlayAudio = async () => {
        let audio = new Audio(audioUrl);
        await audio.play();
    }

    return (
        <div>
            <h1>Welcome to Masterpiece</h1>
            <button> Queue up next Song</button>
            <button> Upload Masterpiece</button>
            <button onClick={FetchGet}> Test Get Fetch</button>
            <button onClick={()=>FetchPut(34)}> Put 34</button>
            <button onClick={() => FetchAudioBlob(setAudioUrl)}> Change Audio</button>
            <button onClick={PlayAudio}> Play </button>
            <Chooser/>
        </div>
    );
}
