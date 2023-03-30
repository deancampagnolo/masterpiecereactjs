import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export default function HelpPage (): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', width: '90%' }}>
                <Typography variant='h3' >
                    Help Page
                </Typography >

                <Typography variant='h5' sx={{ marginTop: 4, marginBottom: 2 }} >
                    What is &apos;Nudge&apos;?
                </Typography>

                <Typography variant='subtitle1'>
                    &apos;Nudge&apos; is what we use in a Masterpiece to change the timing in which the associated track starts at.
                </Typography>
                <Typography variant='subtitle2'>
                    (Oftentimes when uploading audio, it won&apos;t perfectly match up with the existing audio, so you may need to use the nudge buttons to adjust the timing.)
                </Typography>
            </Box>
        </Box>
    )
}
