import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { AppBar, Box, IconButton, ThemeProvider } from '@mui/material'
import Typography from '@mui/material/Typography'
import { websiteHeaderTheme } from './Theme/Theme'
import { Menu } from '@mui/icons-material'

export default function WebsiteHeader (): ReactJSXElement {
    return (
        <ThemeProvider theme={websiteHeaderTheme}>
            <AppBar position="sticky" elevation={0} style={{ zIndex: 1251 }}>
                <Box bgcolor="primary.main" display="flex" flexDirection="row">
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 1, mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h5" >
                        MasterpieceMusic.io
                    </Typography>
                </Box>
            </AppBar>
        </ThemeProvider>
    )
}
