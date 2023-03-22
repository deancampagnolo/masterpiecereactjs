import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import React from 'react'
import { ChevronLeft, Create, Portrait, QuestionMark } from '@mui/icons-material'
import { sideDrawerTheme } from '../Theme/Theme'
import { Link } from 'react-router-dom'
import { sideDrawerZIndex } from '../Theme/Styles'
import SideBarSearchButton from './SideBarSearchButton'
import SideBarRandomButton from './SideBarRandomButton'
import { getDrawerWidth } from '../Utils/ThemeBreakpointsUtil'
import { useWindowBreakpointSize } from '../Utils/WindowSizeUtil'

interface MPSideDrawerProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function MPSideDrawer (props: MPSideDrawerProps): ReactJSXElement {
    const theme = sideDrawerTheme
    useWindowBreakpointSize(theme)
    return (
        <ThemeProvider theme={theme}>
            <Box display="flex">
                <Drawer
                    variant="persistent"
                    open={props.isOpen}
                    anchor={'left'}
                    PaperProps={{ sx: { backgroundColor: 'primary.main', borderColor: 'secondary.main', borderWidth: 1, width: getDrawerWidth(theme) } }}
                    style={{ zIndex: sideDrawerZIndex, width: getDrawerWidth(theme) }}
                >
                    <div style={{ marginTop: '5vh', marginLeft: 20, marginRight: 20, backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <IconButton onClick={() => { props.setIsOpen(false) }} style={{ marginLeft: 'auto' }}>
                            <ChevronLeft/>
                        </IconButton>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to='/explore/-1' style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon ><Create /></ListItemIcon>
                                    <ListItemText primary='Create New' />
                                </ListItemButton>
                            </Link>

                            <SideBarSearchButton/>

                            <SideBarRandomButton/>

                            <Link to='/profile' style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon ><Portrait /></ListItemIcon>
                                    <ListItemText primary='Profile' />
                                </ListItemButton>
                            </Link>

                            <Link to='/help' style={{ textDecoration: 'none' }}>
                                <ListItemButton>
                                    <ListItemIcon ><QuestionMark/></ListItemIcon>
                                    <ListItemText primary='Help' />
                                </ListItemButton>
                            </Link>
                        </div>
                    </div>
                </Drawer>
            </Box>
        </ThemeProvider>
    )
}
