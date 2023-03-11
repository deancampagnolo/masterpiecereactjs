import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { AppBar, Box, IconButton, ThemeProvider } from '@mui/material'
import { websiteHeaderTheme } from '../Theme/Theme'
import { Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { websiteHeaderZIndex } from '../Theme/Styles'
import GoogleOAuthHelper from '../LoginUtils/GoogleUtils'
import { UserProfileData } from '../LoginUtils/UserProfileData'

interface TopBarProps {
    onButtonClicked: () => void
}

export default function TopBar (props: TopBarProps): ReactJSXElement {
    const [profileSrc, setProfileSrc] = useState<string | null>(null)

    const successfulAuthCallback = (): void => {
        const user = UserProfileData.getInstance()
        if (user != null) {
            setProfileSrc(user.imageSrc)
        }
    }

    useEffect(() => {
        GoogleOAuthHelper.getInstance()?.onAuthSuccess(successfulAuthCallback)
        GoogleOAuthHelper.getInstance()?.renderGoogleOAuthButton()
        if (profileSrc == null) {
            GoogleOAuthHelper.getInstance()?.showPrompt()
        }
    }, [])
    return (
        <ThemeProvider theme={websiteHeaderTheme}>
            <AppBar position="sticky" elevation={0} style={{ zIndex: websiteHeaderZIndex }}>
                <Box bgcolor="primary.main" display="flex" flexDirection="row" style={{ alignItems: 'center' }}>
                    <Box display="flex" flexDirection="row">
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
                    <Box display="flex" flexDirection="row-reverse" style={{ width: '100%' }}>
                        {profileSrc == null
                            ? <div id="signInDiv"/>
                            : <Link to="/profile" style={{ textDecoration: 'none' }}>
                                <IconButton
                                    size="small"
                                    edge="start"
                                    color="inherit"
                                    sx={{ ml: 1, mr: 4 }}
                                    disableFocusRipple
                                    disableRipple
                                >
                                    <img src={profileSrc} style={{ maxHeight: '2.5vh', maxWidth: 'auto' }} />
                                </IconButton>
                            </Link>}
                    </Box>
                </Box>
            </AppBar>
        </ThemeProvider>
    )
}
