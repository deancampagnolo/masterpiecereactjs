import React, { useState } from 'react'
import './App.css'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from './Theme/Theme'
import WebsiteHeader from './WebsiteHeader'
import MPSideDrawer from './SideBar/MPSideDrawer'
import MPBottomBar from './BottomBar/MPBottomBar'
import AppRouter from './AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { MPMain } from './MPMain'

function App (): ReactJSXElement {
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true)
    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <CssBaseline/>
                <div className="App">
                    <WebsiteHeader onButtonClicked={() => { setIsSideDrawerOpen(!isSideDrawerOpen) }}/>
                    <MPSideDrawer isOpen={isSideDrawerOpen} setIsOpen={setIsSideDrawerOpen}/>
                    <MPMain open={isSideDrawerOpen}>
                        <Box display="flex">
                            <AppRouter/>
                        </Box>
                    </MPMain>
                    <MPBottomBar/>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
