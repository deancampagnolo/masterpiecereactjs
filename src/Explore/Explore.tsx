import React from 'react'
import { Box } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPWorkspaceContainer from './Snippet/MPWorkspaceContainer'
import { useParams } from 'react-router-dom'

export default function Explore (): ReactJSXElement {
    const { id } = useParams()
    console.log(id)
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
            {/* <Sandbox/> */}
            <MPWorkspaceContainer id={Number(id)}/>
        </Box>
    )
}
