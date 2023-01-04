import { FetchAudioBlob, FetchPut } from '../RestOperations/RestOperations'
import React, { useState } from 'react'
import Chooser from './Chooser'
import { GetMasterpieceData } from '../RestOperations/ServerRestOperations'
import { GetS3Audio } from './AudioUtil'
import MPSnippetContainer from './Snippet/MPSnippetContainer'
import { Box } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

export default function Explore (): ReactJSXElement {
    // const [imageSrc, setImageSrc] = useState();
    // const [text, setText] = useState();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const [audioUrl, setAudioUrl] = useState(require('../9to5.mp3'))
    // setAudioUrl(require("./9to5.mp3"));
    // useEffect(() => {
    //   FetchGetFile(setImageSrc);
    // }, []);

    const PlayAudio = async (): Promise<void> => {
        const audio = new Audio(audioUrl)
        await audio.play()
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
            <h1>Welcome to Masterpiece</h1>

            <div>
                {/* eslint-disable @typescript-eslint/no-misused-promises */}
                <button onClick={async () => { await FetchPut(34) }}> Put 34</button>
                <button onClick={async () => { await FetchAudioBlob(setAudioUrl) }}> Change Audio (server)</button>
                <button onClick={async () => { await GetS3Audio(setAudioUrl, 'aRealHoot.mp3') }}> Change Audio (s3)</button>
                <button onClick={PlayAudio}> Play </button>
                <button onClick={GetMasterpieceData}>Get Masterpiece Data</button>
                {/* eslint-enable @typescript-eslint/no-misused-promises */}
                <Chooser/>
            </div>

            <MPSnippetContainer style={{ backgroundColor: 'beige', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '8px', paddingRight: '8px', width: '500px' }}/>

        </Box>
    )
}
