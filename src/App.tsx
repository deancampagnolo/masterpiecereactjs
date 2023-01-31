import React from 'react'
import './App.css'
import Explore from './Explore/Explore'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

function App (): ReactJSXElement {
    return (
        <div className="App">
            <Explore/>
        </div>
    )
}

export default App
