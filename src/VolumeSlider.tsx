import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Slider } from '@mui/material'
import * as React from 'react'

interface VolumeSliderProps {
    onVolumeSliderChange: (e: Event, value: number | number[]) => void
    style?: React.CSSProperties | undefined
}

export default function VolumeSlider (props: VolumeSliderProps): ReactJSXElement {
    return (
        <Slider onChange={props.onVolumeSliderChange} min={-60} max={0} sx={props.style}/>
    )
}
