import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Slider } from '@mui/material'
import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'

interface ProgressSliderProps {
    style?: React.CSSProperties | undefined
}

export default function ProgressSlider (props: ProgressSliderProps): ReactJSXElement {
    const [percentTime, setPercentTime] = useState(0)
    const [userControlledTime, setUserControlledTime] = useState(0)
    const [isUserControlledSlider, setIsUserControlledSlider] = useState(false)

    const updateSliderProgress = (progress: number): void => {
        setPercentTime(Math.round(progress * 100))
    }

    useEffect(() => {
        AudioControllerModelHelper.getInstance().onTransportProgressUpdated(updateSliderProgress)
    }, [])

    const OnSliderChange = (e: Event, value: number | number[]): void => {
        if (typeof (value) === 'number') {
            setIsUserControlledSlider(true)
            setUserControlledTime(value)
            // console.log(Transport.position)
        }
    }

    const OnChangeCommitted = (): void => {
        // console.log('Drag Finished')
        AudioControllerModelHelper.getInstance().startAtPercent(userControlledTime / 100)
        void sleep110SetIsUserControlledSlider(false)// FIXME there is a race condition here with stop() thats why there is .1s delay on it
    }

    const sleep110SetIsUserControlledSlider = async (value: boolean): Promise<void> => {
        await new Promise(() => {
            setTimeout(() => { setIsUserControlledSlider(false) }, 110)// FIXME there is a race condition here with stop() thats why there is .1s delay on it
        })
    }
    return (
        // I think I can ignore the error
        <Slider sx={props.style} value={isUserControlledSlider ? userControlledTime : percentTime} onChange={OnSliderChange} onChangeCommitted={OnChangeCommitted}/>
    )
}
