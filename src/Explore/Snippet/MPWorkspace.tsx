import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { Button } from '@mui/material'

interface MPSnippetContainerProps {
    ffmpeg: FFmpeg
}

export default function MPWorkspace (props: MPSnippetContainerProps): ReactJSXElement {
    const [containerKey, setContainerKey] = useState(Math.floor(Math.random() * 10000000))// FIXME temporary

    return (
        <div>
            <MPSnippetContainer key={containerKey} ffmpeg={props.ffmpeg} style={
                { backgroundColor: 'beige', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '8px', paddingRight: '8px', width: '500px' }
            }/>
            <Button onClick={() => { setContainerKey(Math.floor(Math.random() * 10000000))/* FIXME temporary */ }}>Next</Button>
        </div>
    )
}
