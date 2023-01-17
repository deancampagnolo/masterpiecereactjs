import { FetchAudioBlob, FetchPut } from '../RestOperations/RestOperations'
import React, { useEffect, useState } from 'react'
import Chooser from './Chooser'
import { GetMasterpieceData } from '../RestOperations/ServerRestOperations'
import { GetS3Audio } from './AudioUtil'
import MPSnippetContainer from './Snippet/MPSnippetContainer'
import { Box } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

export default function Explore (): ReactJSXElement {
    // const [imageSrc, setImageSrc] = useState();
    // const [text, setText] = useState();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const [audioUrl, setAudioUrl] = useState(require('../9to5.mp3'))
    const [combinedAudioUrl, setCombinedAudioUrl] = useState('')
    // setAudioUrl(require("./9to5.mp3"));
    // useEffect(() => {
    //   FetchGetFile(setImageSrc);
    // }, []);
    const ffmpeg = createFFmpeg({
        log: true
    })

    const PlayAudio = async (): Promise<void> => {
        const audio = new Audio(audioUrl)
        await audio.play()
    }

    const PlayCombinedAudio = async (): Promise<void> => {
        const audio = new Audio(combinedAudioUrl)
        await audio.play()
    }

    const doTranscode = async (): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        ffmpeg.FS('writeFile', 'test.mp3', await fetchFile('/9to5.mp3'))
        ffmpeg.FS('writeFile', 'test2.mp3', await fetchFile('/awesomejazzsong.mp3'))
        // ffmpeg -i input0.mp3 -i input1.mp3 -filter_complex amix=inputs=2:duration=longest output.mp3
        await ffmpeg.run('-i', 'test.mp3', '-i', 'test2.mp3', '-filter_complex', 'amix=inputs=2:duration=longest', 'output.mp3')
        const data = ffmpeg.FS('readFile', 'output.mp3')
        setCombinedAudioUrl(URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' })))
        // await ffmpeg.run('-i', 'test.mp3', 'test.wav')
    }

    console.log('Loading ffmpeg-core.js')
    useEffect(() => {
        void ffmpeg.load()
    }, [])

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
            <h1>Welcome to Masterpiece</h1>

            <div>
                {/* eslint-disable @typescript-eslint/no-misused-promises */}
                <button onClick={doTranscode}> Do Transcode </button>
                <button onClick={async () => { await FetchPut(34) }}> Put 34</button>
                <button onClick={async () => { await FetchAudioBlob(setAudioUrl) }}> Change Audio (server)</button>
                <button onClick={async () => { await GetS3Audio(setAudioUrl, 'aRealHoot.mp3') }}> Change Audio (s3)</button>
                <button onClick={PlayAudio}> Play </button>
                <button onClick={PlayCombinedAudio}> Play Combined</button>
                <button onClick={GetMasterpieceData}>Get Masterpiece Data</button>
                {/* eslint-enable @typescript-eslint/no-misused-promises */}
                <Chooser/>
            </div>

            <MPSnippetContainer ffmpeg={ffmpeg} style={{ backgroundColor: 'beige', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '8px', paddingRight: '8px', width: '500px' }}/>

        </Box>
    )
}
