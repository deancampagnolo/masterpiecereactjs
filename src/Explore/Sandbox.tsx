import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { useState } from 'react'
import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'
import { loaded, Player, start, Transport } from 'tone'
import { Slider } from '@mui/material'
import { FetchPut } from '../RestOperations/SimpleRestOperations'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Sandbox (): ReactJSXElement {
    const [audioControllerModel] = useState(AudioControllerModelHelper.getInstance())
    const [playerArray] = useState([] as Player[])
    const [percentTime] = useState(0)
    const [userControlledTime, setUserControlledTime] = useState(0)
    const [isUserControlledSlider, setIsUserControlledSlider] = useState(false)

    const OnSliderChange = (e: Event, value: number | number[]): void => {
        if (typeof (value) === 'number') {
            setIsUserControlledSlider(true)
            setUserControlledTime(value)
            // console.log(Transport.position)
        }
    }

    const AudioStuff = async (): Promise<void> => {
        Transport.bpm.value = 100
        Transport.loop = true
        Transport.loopStart = '0'
        Transport.loopEnd = '8m'
        //
        // setInterval(() => {
        //     // scale it between 0-1
        //     const progress = Math.round(Transport.progress * 100)
        //     setPercentTime(progress)
        // }, 16)

        // const player = new Player(require('../9to5.mp3')).toDestination().sync().start(0).stop('6m')
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        // new Player(require('../abc.wav')).toDestination().sync().start(0).stop('6m')

        LoadedThing()
    }

    const LoadedThing = (): void => {
        void loaded().then(() => {
            void start()
        })
    }

    const AddOtherPlayer = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        // const player = new Player(require('../9to5.mp3')).toDestination().sync().start(0).stop('6m')
        // playerArray.push(player)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        audioControllerModel.addAudio(132, require('../9to5.mp3'), 0, '6m')
    }

    const DisposeAllPlayers = (): void => {
        // playerArray.forEach((value, index, array) => {
        //     value.dispose()
        // })
        audioControllerModel.removeAudio(132)
    }

    const AddOtherPlayerDispose = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const player = new Player(require('../9to5.mp3')).toDestination().sync().start(0).stop('6m')
        playerArray.push(player)
        player.dispose()
    }

    const Start = (): void => {
        audioControllerModel.toggleMaster()
        // Transport.start()
        // ramp up to 800 bpm over 10 seconds
        // Transport.bpm.rampTo(800, 10)
    }

    const StartAtPercent = (percent: number): void => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const seconds = Math.round(Number(Transport.loopEnd.valueOf().toString()) * percent * 10) / 10
        // console.log(seconds)
        Transport.stop()
        Transport.start('+.1', '+' + seconds.toString()) // FIXME there is a race condition here with stop() thats why there is .1s delay on it
    }

    const Stop = (): void => {
        Transport.stop()
    }

    const Pause = (): void => {
        Transport.pause()
    }
    const OnChangeCommitted = (): void => {
        // console.log('Drag Finished')
        StartAtPercent(userControlledTime / 100)
        void sleep110SetIsUserControlledSlider(false)// FIXME there is a race condition here with stop() thats why there is .1s delay on it
    }

    const sleep110SetIsUserControlledSlider = async (value: boolean): Promise<void> => {
        await new Promise(() => {
            setTimeout(() => { setIsUserControlledSlider(false) }, 110)// FIXME there is a race condition here with stop() thats why there is .1s delay on it
        })
    }

    const reset = (): void => {
        Transport.cancel()
    }

    return (
        <div>
            <button onClick={() => { void AudioStuff() }}> Audio Stuff </button>
            <button onClick={Start}> Start </button>
            <button onClick={Stop}> Stop </button>
            <button onClick={Pause}> Pause </button>
            <Slider value={isUserControlledSlider ? userControlledTime : percentTime} onChange={OnSliderChange} onChangeCommitted={OnChangeCommitted}/>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button onClick={async () => { await FetchPut(34) }}> Put 34</button>
            <button onClick={AddOtherPlayer}> Add Other Player </button>
            <button onClick={AddOtherPlayerDispose}> Add Other Player Dispose </button>
            <button onClick={DisposeAllPlayers}> Dispose All Players </button>
            <button onClick={LoadedThing}> Load Thing </button>
            <button onClick={reset}> Reset </button>
        </div>
    )
}
