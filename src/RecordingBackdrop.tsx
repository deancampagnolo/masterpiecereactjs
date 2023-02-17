import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { backdropZIndex } from './Theme/Styles'
import Typography from '@mui/material/Typography'
import { Backdrop, CircularProgress } from '@mui/material'
import * as React from 'react'

interface RecordingBackdropProps {
    isRecording: boolean
}

export default function RecordingBackdrop (props: RecordingBackdropProps): ReactJSXElement {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: backdropZIndex }}
            open={props.isRecording}
        >
            <Typography>
                Rendering out Tracks for download...
            </Typography>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
