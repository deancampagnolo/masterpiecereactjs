import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { AppBar, Box, IconButton, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Pause, PlayArrow } from '@mui/icons-material'
import { bottomBarTheme } from '../Theme/Theme'
import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'

const playPauseIconStyle = {
    width: 50,
    height: 50,
    color: 'warning.main'
}

export default function MPBottomBar (): ReactJSXElement {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        AudioControllerModelHelper.getInstance().clearTransportStateEmitter()
        AudioControllerModelHelper.getInstance().onTransportStateChanged((isTransportPlaying) => {
            setIsPlaying(isTransportPlaying)
        })
    }, [])

    const onPlayClicked = (): void => {
        AudioControllerModelHelper.getInstance().start().then(
            () => { AudioControllerModelHelper.getInstance().toggleMaster() }).catch(() => { console.error('On Play Failed') })
    }

    // const onVolumeSliderChange = (e: Event, value: number | number[]): void => {
    //     if (typeof (value) === 'number') {
    //         AudioControllerModelHelper.getInstance().setMasterVolume(value)
    //     }
    // }

    return (
        <ThemeProvider theme={bottomBarTheme}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, zIndex: 1251, paddingTop: 2, paddingBottom: 2 }}>
                <Box bgcolor="primary.main" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                    <div>
                        <IconButton size="small" onClick={onPlayClicked} sx={{
                            borderRadius: '50%',
                            border: 2,
                            borderColor: 'warning.main'
                        }}>
                            {isPlaying ? <Pause sx={playPauseIconStyle}/> : <PlayArrow sx={playPauseIconStyle}/>}
                        </IconButton>
                    </div>
                    {/* <Typography style={{ marginLeft: '1vw' }}> */}
                    {/*    Master Volume */}
                    {/* </Typography> */}
                    {/* <VolumeSlider onVolumeSliderChange={onVolumeSliderChange} style={{ color: 'warning.main', marginLeft: '20px', marginRight: '20px', width: '5%' }}/> */}

                </Box>
            </AppBar>
        </ThemeProvider>
    )
}
