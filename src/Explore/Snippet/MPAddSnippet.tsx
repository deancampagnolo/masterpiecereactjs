import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Add } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface MPAddSnippetProps {
    title: string
    submitOnClick: (selectedFiles: string[]) => void
}

export default function MPAddSnippet (props: MPAddSnippetProps): ReactJSXElement {
    const onFileChange = (event: any): void => {
        // I once got a bug where a chosen correct mp3 file errored with tone.js saying that it wasnt the correct content type
        // console.log(event.target.files[0])

        const fileUrls = [] as string[]
        Array.prototype.forEach.call(event.target.files, file => {
            fileUrls.push(URL.createObjectURL(file))
        })
        props.submitOnClick(fileUrls)
    }

    return (

        <Box bgcolor="secondary.main" style={{ width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" style={{ flex: 1, alignItems: 'center' }}>
                    <IconButton size="small" component="label">
                        <input hidden type="file" multiple={true} onChange={onFileChange}/>
                        <Add/>
                    </IconButton>
                    <Typography align="left" style={{ flex: 10, marginLeft: '10px', height: '100%' }}>
                        {props.title}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
