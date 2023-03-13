import React, { useEffect, useState } from 'react'
import './App.css'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from '../Theme/Theme'
import TopBar from '../TopBar/TopBar'
import MPSideDrawer from '../SideBar/MPSideDrawer'
import MPBottomBar from '../BottomBar/MPBottomBar'
import AppRouter from './AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { MPMain } from './MPMain'
import GoogleOAuthHelper from '../LoginUtils/GoogleUtils'
import Typography from '@mui/material/Typography'

function App (): ReactJSXElement {
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true)

    useEffect(() => {
        GoogleOAuthHelper.getInstance() // init
    }, [])

    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <div style={{ height: '100vh' }}>
                    <CssBaseline/>
                    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <TopBar onButtonClicked={() => { setIsSideDrawerOpen(!isSideDrawerOpen) }}/>
                        <MPSideDrawer isOpen={isSideDrawerOpen} setIsOpen={setIsSideDrawerOpen}/>
                        <MPMain open={isSideDrawerOpen}>
                            <Box display="flex">
                                <AppRouter/>
                            </Box>
                        </MPMain>
                        <MPBottomBar/>
                    </div>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
