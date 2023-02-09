import * as React from 'react'

import Typography from '@mui/material/Typography'
import { Remove, VolumeUp, VolumeOff, Mic } from '@mui/icons-material'
import { Box, Divider, IconButton, Input, Slider } from '@mui/material'
import { useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface MPSnippetProps {
    title: string
    onRemove: () => void
    onMute: () => void
    onSolo: () => void
    onVolumeChange: (dbs: number) => void
    onSnippetTitleChange: (title: string) => void
}

export default function MPSnippet (props: MPSnippetProps): ReactJSXElement {
    return (
        <Box bgcolor="secondary.main" style={{ width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <LeftPortion onMute={props.onMute} onSolo={props.onSolo} style={{ flex: 1 }}/>
                <Divider orientation="vertical" flexItem variant="middle" sx={{ margin: '10px' }}/>
                <Box display="flex" flexDirection="column" style={{ flex: 11 }}>
                    <TopPortion defaultTitle={props.title} onSnippetTitleChange={props.onSnippetTitleChange}/>
                    <Divider flexItem variant="middle"/>
                    <BottomPortion onVolumeChange={props.onVolumeChange}/>
                </Box>
                <Divider orientation="vertical" flexItem variant="middle" sx={{ margin: '10px' }}/>
                <RightPortion onRemove={() => { props.onRemove() }} style={{ flex: 1 }}/>
            </Box>
        </Box>
    )
}

interface LeftPortionProps {
    onMute: () => void
    onSolo: () => void
    style?: React.CSSProperties
}

function LeftPortion (props: LeftPortionProps): ReactJSXElement {
    const [isMuted, setIsMuted] = useState(false)

    const onMuteClicked = (): void => {
        setIsMuted(!isMuted)
        props.onMute()
    }
    return (
        <Box display="flex" flexDirection="row" alignItems="center" style={props.style}>
            <IconButton size="small" onClick={onMuteClicked}>
                {isMuted ? <VolumeOff/> : <VolumeUp/>}
            </IconButton>
            <IconButton size="small" onClick={props.onSolo}>
                <Mic/>
            </IconButton>
        </Box>
    )
}

interface RightPortionProps {
    onRemove: () => void
    style?: React.CSSProperties
}

function RightPortion (props: RightPortionProps): ReactJSXElement {
    return (
        <IconButton size="small" onClick={() => { props.onRemove() }} style={props.style}>
            <Remove/>
        </IconButton>
    )
}

interface TopPortionProps {
    defaultTitle: string
    onSnippetTitleChange: (title: string) => void
}

function TopPortion (props: TopPortionProps): ReactJSXElement {
    const [title, setTitle] = useState(props.defaultTitle)

    const onSnippetTitleChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const title = e.target.value
        setTitle(title)
        props.onSnippetTitleChange(title)
    }

    return (
        <Input type="text" defaultValue={title} onChange={onSnippetTitleChangeEvent} disableUnderline={true} style={{ background: 'none', border: 'none', flex: 10 }}/>
    )
}

interface BottomPortionProps {
    onVolumeChange: (dbs: number) => void
}

function BottomPortion (props: BottomPortionProps): ReactJSXElement {
    const onVolumeSliderChange = (e: Event, value: number | number[]): void => {
        console.log(value)
        if (typeof (value) === 'number') {
            props.onVolumeChange(value)
        }
    }
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Typography>
                Volume
            </Typography>
            <Slider onChange={onVolumeSliderChange} min={-60} max={0} sx = {{ marginLeft: '20px', marginRight: '20px', width: '30%' }}/>
        </Box>
    )
}
