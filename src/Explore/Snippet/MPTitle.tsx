import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import * as React from 'react'
import { Input, Theme, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { appTheme } from '../../Theme/Theme'
import { useWindowBreakpointSize } from '../../Utils/WindowSizeUtil'

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
    useWindowBreakpointSize(useTheme())
    const isExtraSmall = useMediaQuery((theme: Theme) => `${theme.breakpoints.down('sm')}`)
    const isSmall = useMediaQuery((theme: Theme) => `${theme.breakpoints.down('md')}`)

    let fontSize

    if (isExtraSmall) {
        fontSize = appTheme.typography.h3.fontSize
    } else if (isSmall) {
        fontSize = appTheme.typography.h2.fontSize
    } else {
        fontSize = appTheme.typography.h1.fontSize
    }

    return (
        <div>
            <Input type="text" defaultValue={title} onChange={onTitleChangeEvent}
                inputProps={{ style: { textAlign: 'center', fontSize } }}
                style={{ marginTop: '2vh', marginBottom: '2vh' }}/>
        </div>
    )
}
