import React, { useEffect, useRef, useState } from 'react'
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

function App (): ReactJSXElement {
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true)
    const bottomAppBarRef = useRef(null as HTMLDivElement | null)

    useEffect(() => {
        GoogleOAuthHelper.getInstance() // init
    }, [])

    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <div style={{ height: '100vh' }}>
                    <CssBaseline/>
                    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <TopBar onButtonClicked={() => { setIsSideDrawerOpen(!isSideDrawerOpen) }}/>
                        <MPSideDrawer isOpen={isSideDrawerOpen} setIsOpen={setIsSideDrawerOpen}/>
                        <MPMain open={isSideDrawerOpen}>
                            {/* extra pixels added to clientHeight as temporary solution for when bottom bar resizes */}
                            <Box display="flex" marginBottom={bottomAppBarRef.current != null ? (bottomAppBarRef.current?.clientHeight + 20).toString() + 'px' : 0}>
                                <AppRouter/>
                            </Box>
                        </MPMain>
                        <MPBottomBar bottomBarAppRef={bottomAppBarRef}/>
                    </div>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
