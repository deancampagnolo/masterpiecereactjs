import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, Input, InputBaseComponentProps } from '@mui/material'
import Typography from '@mui/material/Typography'
import { appTheme } from '../../Theme/Theme'

interface MetaDataInputProps {
    title: string
    defaultValue?: unknown
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export default function MetaDataInput (props: MetaDataInputProps): ReactJSXElement {
    const metaDataInputStyle = (): InputBaseComponentProps => {
        return ({ style: { fontSize: appTheme.typography.subtitle2.fontSize } })
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="subtitle2">
                {props.title}:&nbsp;
            </Typography>
            <Input type="text" defaultValue={props.defaultValue} onChange={props.onChange} inputProps={metaDataInputStyle()}/>
        </Box>
    )
}
