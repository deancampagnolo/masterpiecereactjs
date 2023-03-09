import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Route, Routes } from 'react-router-dom'
import Explore from './Explore/Explore'
import Sandbox from './Explore/Sandbox'
import Homepage from './Homepage/Homepage'
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'
import Profile from './Profile/Profile'

export default function AppRouter (): ReactJSXElement {
    return (
        <Routes>
            <Route path="/explore/:id" element={
                <Explore/>
            } />
            <Route path="/sandbox" element={
                <Sandbox/>
            } />
            <Route path="/" element={
                <Homepage/>
            } />
            <Route path="/privacypolicy" element={
                <PrivacyPolicy/>
            }/>
            <Route path="/profile" element={
                <Profile/>
            }/>
        </Routes>

    )
}
