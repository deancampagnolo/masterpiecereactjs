import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { UserProfileData } from '../LoginUtils/UserProfileData'
import GoogleOAuthHelper from '../LoginUtils/GoogleUtils'
import MPLink from '../SharedComponenets/MPLink'
import { GetAllMPHistory } from '../RestOperations/MPRestOperations'

export default function Profile (): ReactJSXElement {
    const [user, setUser] = useState(UserProfileData.getInstance())
    const [mpLinks, setMpLinks] = useState(null as number[] | null)

    const successfulAuthCallback = (): void => {
        setUser(UserProfileData.getInstance())
    }

    useEffect(() => {
        GoogleOAuthHelper.getInstance()?.onAuthSuccess(successfulAuthCallback)
        if (user == null) {
            GoogleOAuthHelper.getInstance()?.showPrompt()
        }
    }, [])

    useEffect(() => {
        if (user != null) {
            GetAllMPHistory(user.userId).then(
                newMpLinks => {
                    if (newMpLinks != null) {
                        setMpLinks(newMpLinks)
                    }
                }
            ).catch(console.error)
        }
    }, [user])

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
                            <Typography variant='h5'>
                                Your Previous Projects:
                            </Typography>
                            { mpLinks?.map((value, index) => {
                                return (<MPLink key={index} mpId={value}/>)
                            })
                            }
                            {/* TODO implement pagination */}
                            {/* { */}
                            {/*     (mpLinks.length === 10) && */}
                            {/*     <Button> Next Page </Button> */}
                            {/* } */}
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
