import React, { useEffect } from 'react'
import './App.css'
import Explore from './Explore/Explore'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { createFFmpeg } from '@ffmpeg/ffmpeg'

function App (): ReactJSXElement {
    const ffmpeg = createFFmpeg({
        log: true
    })
    useEffect(() => {
        console.log('Loading ffmpeg-core.js')
        ffmpeg.load().then(() => { console.log('finished loading ffmpeg-core.js') }).catch(reason => { console.log(reason) })
    }, [])
    return (
        <div className="App">
            <Explore ffmpeg={ffmpeg}/>
        </div>
    )
}

export default App
