import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import * as React from 'react'
import { Input } from '@mui/material'
import { useState } from 'react'
import { appTheme } from '../../Theme/Theme'

interface MPTitleProps {
    onTitleChange: (title: string) => void
    defaultTitle: string
}

export default function MPTitle (props: MPTitleProps): ReactJSXElement {
    const [title, setTitle] = useState(props.defaultTitle)
    const onTitleChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newTitle = e.target.value
        setTitle(newTitle)
        props.onTitleChange(newTitle)
    }

    return (
        <div>
            <Input type="text" defaultValue={title} onChange={onTitleChangeEvent}
                inputProps={{ style: { textAlign: 'center', fontSize: appTheme.typography.h1.fontSize } }}
                style={{ marginTop: '2vh', marginBottom: '2vh' }}/>
        </div>
    )
}
