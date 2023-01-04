import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Add } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface MPAddSnippetProps {
    title: string
}

export default function MPAddSnippet (props: MPAddSnippetProps): ReactJSXElement {
    return (

        <div style={{ backgroundColor: 'lightblue', width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" style={{ flex: 1 }}>
                    <IconButton size="small" onClick={() => {}}>
                        <Add/>
                    </IconButton>
                    <Typography align="left" style={{ flex: 10, marginLeft: '10px', height: '100%', backgroundColor: 'brown' }}>
                        {props.title}
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}
