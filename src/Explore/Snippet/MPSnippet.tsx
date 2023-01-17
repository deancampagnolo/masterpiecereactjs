import * as React from 'react'

import Typography from '@mui/material/Typography'
import { PlayArrow, UnfoldMore, Pause, Remove } from '@mui/icons-material'
import { Box, Collapse, IconButton } from '@mui/material'
import { useState } from 'react'
import AudioController from '../Utils/AudioController'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface MPSnippetProps {
    title: string
    audioController: AudioController
    onRemove: () => void
    removeEnabled?: boolean
}

export default function MPSnippet (props: MPSnippetProps): ReactJSXElement {
    // const audioController = useRef(new AudioController(props.audio))

    const [isExpanded, setIsExpanded] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    // isPlaying ? ()=>audioController.playAudio() : ()=>audioController.pauseAudio()

    if (isPlaying) {
        void props.audioController.playAudio()
    } else {
        void props.audioController.pauseAudio()
    }

    return (
        <div style={{ backgroundColor: 'lightblue', width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="column">
                <TopPortion title={props.title} isExpanded={isExpanded} setIsExpanded={setIsExpanded} isPlaying={isPlaying}
                    onClick={() => { setIsPlaying(!isPlaying) }} onRemove={() => { props.onRemove() }} removeEnabled={(props.removeEnabled === undefined) ? true : props.removeEnabled.valueOf()}/>
                <CollapsablePortion isExpanded={isExpanded}/>
            </Box>
        </div>
    )
}

interface TopPortionProps {
    title: string
    setIsExpanded: any
    isExpanded: boolean
    isPlaying: boolean
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
    onRemove: () => void
    removeEnabled: boolean
}

function TopPortion (props: TopPortionProps): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="row" style={{ flex: 1 }}>
            <IconButton size="small" onClick={props.onClick}>
                {props.isPlaying ? <Pause/> : <PlayArrow/>}
            </IconButton>

            <Typography align="left" style={{ flex: 10, marginLeft: '10px', height: '100%', backgroundColor: 'brown' }}>
                {props.title}
            </Typography>
            <IconButton size="small" onClick={() => props.setIsExpanded(!props.isExpanded)}>
                <UnfoldMore/>
            </IconButton>
            { props.removeEnabled
                ? <IconButton size="small" onClick={() => { props.onRemove() }}>
                    <Remove/>
                </IconButton>
                : null}

        </Box>
    )
}

interface CollapsablePortionProps {
    isExpanded: boolean
}

function CollapsablePortion (props: CollapsablePortionProps): ReactJSXElement {
    return (
        <Collapse in={props.isExpanded} >
            <Typography>Expanded!</Typography>
            {/* WARNING THIS IS GETTING RENDERED EVEN IF 'in' IS FALSE */}
            {/* {isExpanded ? <Typography>Expanded!</Typography> : undefined} */}
        </Collapse>
    )
}
