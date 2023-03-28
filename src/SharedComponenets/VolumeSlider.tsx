import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Slider } from '@mui/material'
import * as React from 'react'
import { dbValueToSliderValue, sliderValueToDbValue } from '../Utils/VolumeUtil'

interface VolumeSliderProps {
    onVolumeSliderChange: (e: Event, value: number | number[]) => void
    style?: React.CSSProperties | undefined
    defaultValue?: number | number[]
}

export default function VolumeSlider (props: VolumeSliderProps): ReactJSXElement {
    const onSliderChange = (e: Event, value: number | number[]): void => {
        const newSliderValue = value as number
        props.onVolumeSliderChange(e, sliderValueToDbValue(newSliderValue))
    }

    return (
        <Slider onChange={onSliderChange} min={0} max={100} defaultValue={dbValueToSliderValue(props.defaultValue as number)} sx={props.style}/>
    )
}
