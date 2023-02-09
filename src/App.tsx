import React from 'react'
import './App.css'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from './Theme/Theme'
import WebsiteHeader from './WebsiteHeader'
import MPSideDrawer from './MPSideDrawer'
import MPBottomBar from './MPBottomBar'
import AppRouter from './AppRouter'

function App (): ReactJSXElement {
    return (
        <ThemeProvider theme={appTheme}>

            <CssBaseline/>
            <div className="App">
                <WebsiteHeader/>
                <MPSideDrawer/>
                <AppRouter/>
                <MPBottomBar/>
            </div>

        </ThemeProvider>
    )
}

export default App
