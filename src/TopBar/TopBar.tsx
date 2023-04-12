import React, { useCallback, useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { AppBar, Box, IconButton, ThemeProvider } from '@mui/material'
import { websiteHeaderTheme } from '../Theme/Theme'
import { Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { fullSizeGoogleAuthButtonHeight, websiteHeaderZIndex } from '../Theme/Styles'
import GoogleOAuthHelper from '../LoginUtils/GoogleUtils'
import { UserProfileData } from '../LoginUtils/UserProfileData'
import WebsiteNotFinishedBanner from '../WebsiteNotFinishedBanner'

interface TopBarProps {
    setTopBarHeight: (height: number) => void
    onButtonClicked: () => void
}

export default function TopBar (props: TopBarProps): ReactJSXElement {
    const [profileSrc, setProfileSrc] = useState<string | null>(null)

    const measuredRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            props.setTopBarHeight(node.getBoundingClientRect().height)
        }
    }, [])

    const successfulAuthCallback = (): void => {
        const user = UserProfileData.getInstance()
        if (user != null) {
            setProfileSrc(user.imageSrc)
        }
    }

    useEffect(() => {
        GoogleOAuthHelper.getInstance()?.onAuthSuccess(successfulAuthCallback)
        GoogleOAuthHelper.getInstance()?.renderGoogleOAuthButton(websiteHeaderTheme)
        if (profileSrc == null) {
            GoogleOAuthHelper.getInstance()?.showPrompt()
        }
    }, [])
    return (
        <ThemeProvider theme={websiteHeaderTheme}>
            <AppBar ref={measuredRef} position="fixed" elevation={0} style={{ zIndex: websiteHeaderZIndex, minHeight: fullSizeGoogleAuthButtonHeight }}>
                <WebsiteNotFinishedBanner/>
                <Box bgcolor="primary.main" display="flex" flexDirection="row" style={{ alignItems: 'center', height: '100%' }}>
                    <Box display="flex" flexDirection="row" alignItems="center" style={{ height: '100%' }}>
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
                    {/* The paddingRight property is there because the signInDiv seems to have inherit margin/ padding
                    I will probably have to make custom button in future. If you remove it the website will have unnecessary
                     scrolling horizontally and vertically */}
                    <Box display="flex" flexDirection="row-reverse" style={{ width: 'auto', flexGrow: 1, paddingRight: 10 }}>
                        {profileSrc == null
                            ? <div id="signInDiv" style={{
                                position: 'fixed',
                                top: '0',
                                right: '0'
                            }}/>
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
