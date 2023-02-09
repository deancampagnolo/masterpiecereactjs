import React from 'react'
import { Box } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPWorkspaceContainer from './Snippet/MPWorkspaceContainer'

export default function Explore (): ReactJSXElement {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
            {/* <Sandbox/> */}
            <MPWorkspaceContainer/>
        </Box>
    )
}
