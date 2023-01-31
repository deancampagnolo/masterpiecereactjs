import * as React from 'react'

import Typography from '@mui/material/Typography'
import { PlayArrow, UnfoldMore } from '@mui/icons-material'
import { Box, Collapse, IconButton } from '@mui/material'
import { useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface MPSnippetMasterProps {
    title: string
    onPlayPause: () => void
}

export default function MPSnippetMaster (props: MPSnippetMasterProps): ReactJSXElement {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div style={{ backgroundColor: 'lightblue', width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="column">
                <TopPortionMaster title={props.title} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
                    onClick={props.onPlayPause} />
                <CollapsablePortionMaster isExpanded={isExpanded}/>
            </Box>
        </div>
    )
}

interface TopPortionMasterProps {
    title: string
    setIsExpanded: any
    isExpanded: boolean
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function TopPortionMaster (props: TopPortionMasterProps): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="row" style={{ flex: 1 }}>
            <IconButton size="small" onClick={props.onClick}>
                <PlayArrow/>
            </IconButton>

            <Typography align="left" style={{ flex: 10, marginLeft: '10px', height: '100%', backgroundColor: 'brown' }}>
                {props.title}
            </Typography>
            <IconButton size="small" onClick={() => props.setIsExpanded(!props.isExpanded)}>
                <UnfoldMore/>
            </IconButton>
        </Box>
    )
}

interface CollapsablePortionMasterProps {
    isExpanded: boolean
}

function CollapsablePortionMaster (props: CollapsablePortionMasterProps): ReactJSXElement {
    return (
        <Collapse in={props.isExpanded} >
            <Typography>Expanded!</Typography>
            {/* WARNING THIS IS GETTING RENDERED EVEN IF 'in' IS FALSE */}
            {/* {isExpanded ? <Typography>Expanded!</Typography> : undefined} */}
        </Collapse>
    )
}
