import React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Homepage (): ReactJSXElement {
    return (
        <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', width: '50%' }}>
                <Box margin={4}>
                    <Typography variant='h3' >
                Welcome To
                    </Typography >
                    <Typography variant='h2'>
                Masterpiece Music
                    </Typography>
                </Box>
                <Box marginTop={10} marginBottom={2}>
                    <Typography variant='h4' marginBottom={2}>
                        What is Masterpiece Music?
                    </Typography>
                    <Typography variant='h6'>
                        Masterpiece Music is a great way to collaboratively create music, requiring you to only make the parts that you are interested in!
                    </Typography>
                </Box>

                <Link to='/explore' >
                    <Typography variant='h5'>
                        Try it out :)
                    </Typography>
                </Link>
                <Link to='/sandbox' >
                    <Typography variant='h6'>
                        To developmental sandbox :O
                    </Typography>
                </Link>
            </Box>
        </Box>
    )
}
