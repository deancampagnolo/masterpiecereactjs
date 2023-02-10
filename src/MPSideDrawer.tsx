import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { Casino, ChevronLeft, Create, Portrait, Settings } from '@mui/icons-material'
import { sideDrawerTheme } from './Theme/Theme'
import { Link } from 'react-router-dom'
import SideBarSearchButton from './SideBarSearchButton'

export default function MPSideDrawer (): ReactJSXElement {
    const [open, setOpen] = useState(true) // Figure out best way to hoist this up without causing rerenders, maybe global state of some sort?

    return (
        <ThemeProvider theme={sideDrawerTheme}>
            <Drawer
                variant="persistent"
                open={open}
                anchor={'left'}
                onClose={() => { setOpen(false) }}
                PaperProps={{ sx: { backgroundColor: 'primary.main', borderWidth: 0 } }}
                style={{ zIndex: 1250 }}
            >
                <div style={{ marginTop: '5vh', marginLeft: 20, marginRight: 20, backgroundColor: 'transparent', display: 'flex', flexDirection: 'column' }}>
                    <IconButton onClick={() => { setOpen(false) }} style={{ marginLeft: 'auto' }}>
                        <ChevronLeft/>
                    </IconButton>
                    <div>
                        <Link to='/explore/1'>
                            <ListItemButton>
                                <ListItemIcon ><Create /></ListItemIcon>
                                <ListItemText primary='Create New' />
                            </ListItemButton>
                        </Link>

                        <SideBarSearchButton/>

                        <ListItemButton>
                            <ListItemIcon ><Casino /></ListItemIcon>
                            <ListItemText primary='Random' />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon ><Portrait /></ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon ><Settings /></ListItemIcon>
                            <ListItemText primary='Settings' />
                        </ListItemButton>
                    </div>
                </div>
            </Drawer>
        </ThemeProvider>
    )
}
