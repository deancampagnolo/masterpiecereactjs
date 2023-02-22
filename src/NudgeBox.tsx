import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, IconButton } from '@mui/material'
import { NudgeType } from './Utils/AudioControllerModel'
import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight
} from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import * as React from 'react'

interface NudgeBoxProps {
    onNudge: (nudge: NudgeType) => void
}

export default function NudgeBox (props: NudgeBoxProps): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton size="small" onClick={() => { props.onNudge(NudgeType.VeryLeft) }}>
                <KeyboardDoubleArrowLeft/>
            </IconButton>
            <IconButton size="small" onClick={() => { props.onNudge(NudgeType.Left) }}>
                <KeyboardArrowLeft/>
            </IconButton>
            <Typography>
                Nudge
            </Typography>
            <IconButton size="small" onClick={() => { props.onNudge(NudgeType.Right) }}>
                <KeyboardArrowRight/>
            </IconButton>
            <IconButton size="small" onClick={() => { props.onNudge(NudgeType.VeryRight) }}>
                <KeyboardDoubleArrowRight/>
            </IconButton>
        </Box>
    )
}
