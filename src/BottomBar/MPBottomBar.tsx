import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { AppBar, Box, IconButton, Theme, ThemeProvider, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Pause, PlayArrow } from '@mui/icons-material'
import { bottomBarTheme } from '../Theme/Theme'
import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'
import VolumeSlider from '../SharedComponenets/VolumeSlider'
import ProgressSlider from '../SharedComponenets/ProgressSlider'
import { bottomBarZIndex } from '../Theme/Styles'

const playPauseIconStyle = {
    width: 50,
    height: 50,
    color: 'warning.main'
}

interface MpBottomBarProps {
    bottomBarAppRef: React.MutableRefObject<HTMLDivElement | null>
}

export default function MPBottomBar (props: MpBottomBarProps): ReactJSXElement {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        AudioControllerModelHelper.getInstance().clearTransportStateEmitter()
        AudioControllerModelHelper.getInstance().onTransportStateChanged((isTransportPlaying) => {
            setIsPlaying(isTransportPlaying)
        })
    }, [])

    const shouldStack = useMediaQuery((theme: Theme) => `${theme.breakpoints.down('lg')} or (orientation: portrait)`)
    const isExtraSmall = useMediaQuery((theme: Theme) => `${theme.breakpoints.down('sm')}`)

    const onPlayClicked = (): void => {
        AudioControllerModelHelper.getInstance().toggleMaster(true)
    }

    const onVolumeSliderChange = (e: Event, value: number | number[]): void => {
        if (typeof (value) === 'number') {
            AudioControllerModelHelper.getInstance().setMasterVolume(value)
        }
    }

    return (
        <ThemeProvider theme={bottomBarTheme}>
            <AppBar ref={props.bottomBarAppRef} position="fixed" sx={{ top: 'auto', bottom: 0, zIndex: bottomBarZIndex, paddingTop: 2, paddingBottom: 2 }}>
                <Box flexDirection="column" bgcolor="primary.main">
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                        <div>
                            <IconButton size="small" onClick={onPlayClicked} sx={{
                                borderRadius: '50%',
                                border: 2,
                                borderColor: 'warning.main'
                            }}>
                                {isPlaying ? <Pause sx={playPauseIconStyle}/> : <PlayArrow sx={playPauseIconStyle}/>}
                            </IconButton>
                        </div>

                        {!shouldStack &&
                            <div style={{ display: 'flex', flexDirection: 'row', width: '15%', justifyContent: 'center' }}>
                                <Typography style={{ marginLeft: '10px' }}>
                                Master Volume
                                </Typography>
                                <VolumeSlider onVolumeSliderChange={onVolumeSliderChange} defaultValue={0}
                                    style={{ color: 'warning.main', marginLeft: '20px', marginRight: '20px', width: '35%' }}/>
                            </div>
                        }
                    </Box>
                    {shouldStack &&
                        <div style={{ display: 'flex', flexDirection: 'row', width: 'auto', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                            <Typography>
                                Master Volume
                            </Typography>
                            <VolumeSlider onVolumeSliderChange={onVolumeSliderChange} defaultValue={0}
                                style={{ color: 'warning.main', marginLeft: '20px', marginRight: '20px', width: isExtraSmall ? '50%' : '10%' }}/>
                        </div>
                    }
                    <Box display="flex" flexDirection="row" width= 'auto' justifyContent="center" alignItems="center" style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Typography>
                            Progress
                        </Typography>
                        <ProgressSlider style={{ color: 'warning.main', marginLeft: '20px', marginRight: '20px', width: isExtraSmall ? '70%' : '20%' }}/>
                    </Box>
                </Box>
            </AppBar>
        </ThemeProvider>
    )
}
