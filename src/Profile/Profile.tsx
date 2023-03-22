import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { UserProfileData } from '../LoginUtils/UserProfileData'
import GoogleOAuthHelper from '../LoginUtils/GoogleUtils'

export default function Profile (): ReactJSXElement {
    const [user, setUser] = useState(UserProfileData.getInstance())

    const successfulAuthCallback = (): void => {
        setUser(UserProfileData.getInstance())
    }

    useEffect(() => {
        GoogleOAuthHelper.getInstance()?.onAuthSuccess(successfulAuthCallback)
        GoogleOAuthHelper.getInstance()?.renderGoogleOAuthButton()
        if (user == null) {
            GoogleOAuthHelper.getInstance()?.showPrompt()
        }
    }, [])

    return (
        <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', width: '50%' }}>

                <Box marginTop={10} marginBottom={2} display="flex" flexDirection="column" style={{ alignItems: 'center' }}>
                    {user != null &&
                        <div>
                            <img src={user?.imageSrc}/>
                            <Typography variant='h4' marginBottom={2}>
                                Current User: {user?.name}
                            </Typography>
                            <Typography variant='h6'>
                                User Id: {user?.userId}
                            </Typography>
                        </div>
                    }
                    {user == null &&
                    <Typography variant='h3'>
                        Sign in on top right of page to view Profile
                    </Typography>}
                </Box>
            </Box>
        </Box>
    )
}
