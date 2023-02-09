import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Drawer, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { Casino, Create, Portrait, Search, Settings } from '@mui/icons-material'
import { sideDrawerTheme } from './Theme/Theme'

const data = [
    { name: 'Create New', icon: <Create /> },
    { name: 'Search', icon: <Search /> },
    { name: 'Random', icon: <Casino /> },
    { name: 'Profile', icon: <Portrait /> },
    { name: 'Settings', icon: <Settings /> }
]
export default function MPSideDrawer (): ReactJSXElement {
    const [open, setOpen] = useState(true)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getList = () => (
        <div style={{ marginTop: 100, marginLeft: 20, marginRight: 20, backgroundColor: 'transparent' }} onClick={() => { setOpen(false) }}>
            {data.map((item, index) => (
                <ListItemButton key={index}>
                    <ListItemIcon >{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>
            ))}
        </div>
    )
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
                {getList()}
            </Drawer>
        </ThemeProvider>
    )
}
