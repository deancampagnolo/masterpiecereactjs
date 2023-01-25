import { FetchPut } from '../RestOperations/SimpleRestOperations'
import React from 'react'
import { Box } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import MPWorkspace from './Snippet/MPWorkspaceContainer'

interface ExploreProps {
    ffmpeg: FFmpeg
}

export default function Explore (props: ExploreProps): ReactJSXElement {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
            <h1>Welcome to Masterpiece</h1>

            <div>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <button onClick={async () => { await FetchPut(34) }}> Put 34</button>
            </div>
            <MPWorkspace ffmpeg={props.ffmpeg}/>
        </Box>
    )
}
