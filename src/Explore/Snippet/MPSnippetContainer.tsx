import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRef } from 'react'
import AudioController from '../Utils/AudioController'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const audioControllers = useRef([new AudioController(require('../../9to5.mp3')), new AudioController(require('../../abc.wav'))])
    audioControllers.current.push()

    return (

        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
            <MPSnippet title="drums" audioController={audioControllers.current[0]}/>
            <MPSnippet title="vocals" audioController={audioControllers.current[1]}/>
            {/* <MPSnippet title="master" audioController={}/> */}
            {/* <MPSnippet title="guitar"/> */}
            {/* <MPSnippet title="bass"/> */}
            <MPAddSnippet title="add audio file here"/>
        </Box>

    )
}
