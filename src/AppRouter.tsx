import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Explore from './Explore/Explore'
import Sandbox from './Explore/Sandbox'
import Homepage from './Homepage'

export default function AppRouter (): ReactJSXElement {
    return (
        <Routes>
            <Route path="/explore" element={
                <Explore/>
            } />
            <Route path="/sandbox" element={
                <Sandbox/>
            } />
            <Route path="/" element={
                <Homepage/>
            } />
        </Routes>

    )
}
