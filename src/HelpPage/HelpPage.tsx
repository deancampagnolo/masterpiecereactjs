import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export default function HelpPage (): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', width: '50%' }}>
                <Typography variant='h3' >
                    Help Page
                </Typography >
                <Typography>
                    LOL just figure it out
                </Typography>
            </Box>
        </Box>
    )
}
