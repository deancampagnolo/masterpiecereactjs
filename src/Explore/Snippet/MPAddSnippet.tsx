import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Add, Check } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useState } from 'react'

interface MPAddSnippetProps {
    title: string
    submitOnClick: (selectedFile: string) => void
}

export default function MPAddSnippet (props: MPAddSnippetProps): ReactJSXElement {
    const [selectedFile, setSelectedFile] = useState('')

    const onFileChange = (event: any): void => { setSelectedFile(URL.createObjectURL(event.target.files[0])) }

    const handleSubmitOnClick = (file: string): void => {
        setSelectedFile('')
        props.submitOnClick(selectedFile)
    }

    return (

        <div style={{ backgroundColor: 'lightblue', width: '100%', borderRadius: '6px', marginTop: '4px', marginBottom: '4px' }}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" style={{ flex: 1 }}>
                    <IconButton size="small" component="label">
                        <input hidden type="file" onChange={onFileChange}/>
                        <Add/>
                    </IconButton>
                    <Typography align="left" style={{ flex: 10, marginLeft: '10px', height: '100%', backgroundColor: 'brown' }}>
                        {props.title} {selectedFile}
                    </Typography>
                    <IconButton size="small" onClick={ (selectedFile !== '') ? () => { handleSubmitOnClick(selectedFile) } : () => { } }>
                        <Check/>
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}
