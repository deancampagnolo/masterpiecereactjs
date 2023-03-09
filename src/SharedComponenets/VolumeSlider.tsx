import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Slider } from '@mui/material'
import * as React from 'react'

interface VolumeSliderProps {
    onVolumeSliderChange: (e: Event, value: number | number[]) => void
    style?: React.CSSProperties | undefined
    defaultValue?: number | number[]
}

export default function VolumeSlider (props: VolumeSliderProps): ReactJSXElement {
    return (
        <Slider onChange={props.onVolumeSliderChange} min={-60} max={0} defaultValue={props.defaultValue} sx={props.style}/>
    )
}
