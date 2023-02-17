import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { AppBar, Box, IconButton, ThemeProvider } from '@mui/material'
import { websiteHeaderTheme } from './Theme/Theme'
import { Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { websiteHeaderZIndex } from './Theme/Styles'

interface WebsiteHeaderProps {
    onButtonClicked: () => void
}

export default function WebsiteHeader (props: WebsiteHeaderProps): ReactJSXElement {
    return (
        <ThemeProvider theme={websiteHeaderTheme}>
            <AppBar position="sticky" elevation={0} style={{ zIndex: websiteHeaderZIndex }}>
                <Box bgcolor="primary.main" display="flex" flexDirection="row">
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 1, mr: 2 }}
                        onClick={props.onButtonClicked}
                    >
                        <Menu />
                    </IconButton>

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography variant="h5" color='common.white' >
                            MasterpieceMusic.io
                        </Typography>
                    </Link>
                </Box>
            </AppBar>
        </ThemeProvider>
    )
}
