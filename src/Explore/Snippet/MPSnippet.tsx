import * as React from 'react'

import Typography from '@mui/material/Typography'
import { UnfoldMore, Remove, VolumeUp, VolumeOff, Mic } from '@mui/icons-material'
import { Box, Collapse, IconButton, Input } from '@mui/material'
import { useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface MPSnippetProps {
    title: string
    onRemove: () => void
    onMute: () => void
    onSolo: () => void
    onSnippetTitleChange: (title: string) => void
}

export default function MPSnippet (props: MPSnippetProps): ReactJSXElement {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div style={{ backgroundColor: 'lightblue', width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="column">
                <TopPortion defaultTitle={props.title} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
                    onMute={props.onMute} onSolo={props.onSolo} onRemove={() => { props.onRemove() }}
                    onSnippetTitleChange={props.onSnippetTitleChange}/>
                <CollapsablePortion isExpanded={isExpanded}/>
            </Box>
        </div>
    )
}

interface TopPortionProps {
    defaultTitle: string
    setIsExpanded: any
    isExpanded: boolean
    onMute: () => void
    onSolo: () => void
    onRemove: () => void
    onSnippetTitleChange: (title: string) => void
}

function TopPortion (props: TopPortionProps): ReactJSXElement {
    const [title, setTitle] = useState(props.defaultTitle)
    const [isMuted, setIsMuted] = useState(false)

    const onSnippetTitleChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const title = e.target.value
        setTitle(title)
        props.onSnippetTitleChange(title)
    }

    const onMuteClicked = (): void => {
        setIsMuted(!isMuted)
        props.onMute()
    }

    return (
        <Box display="flex" flexDirection="row" style={{ flex: 1 }}>

            <IconButton size="small" onClick={onMuteClicked}>
                {isMuted ? <VolumeOff/> : <VolumeUp/>}
            </IconButton>

            <IconButton size="small" onClick={props.onSolo}>
                <Mic/>
            </IconButton>
            {/* <Typography align="left" style={{ flex: 10, marginLeft: '10px', height: '100%', backgroundColor: 'brown' }}> */}
            {/*     {props.title} */}
            {/* </Typography> */}

            {/* //FIXME add editable functionality */}
            <Input type="text" defaultValue={title} onChange={onSnippetTitleChangeEvent} disableUnderline={true} style={{ background: 'none', border: 'none', flex: 10 }}/>
            <IconButton size="small" onClick={() => props.setIsExpanded(!props.isExpanded)}>
                <UnfoldMore/>
            </IconButton>
            <IconButton size="small" onClick={() => { props.onRemove() }}>
                <Remove/>
            </IconButton>

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
