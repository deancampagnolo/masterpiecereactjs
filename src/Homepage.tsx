import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Typography from '@mui/material/Typography'
import { Box, Link } from '@mui/material'

export default function Homepage (): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', width: '100%' }}>
            <Typography >
                Home!
            </Typography>
            <Link display="flex" href={window.location.origin + '/explore'} style={{ justifyContent: 'center' }}>
                To explore page :)
            </Link>
            <Link display="flex" href={window.location.origin + '/sandbox'} style={{ justifyContent: 'center' }}>
                To developmental sandbox :O
            </Link>
        </Box>
    )
}
