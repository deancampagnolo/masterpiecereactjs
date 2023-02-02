import React from 'react'
import { Box} from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPWorkspaceContainer from './Snippet/MPWorkspaceContainer'

export default function Explore (): ReactJSXElement {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
            <h1>Welcome to Masterpiece</h1>
            {/* <Sandbox/> */}
            <MPWorkspaceContainer/>
        </Box>
    )
}
