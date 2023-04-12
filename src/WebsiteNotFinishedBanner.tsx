import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
const WebsiteNotFinishedBanner = (): ReactJSXElement => {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false)
        }, 15000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleClose = (): void => {
        setOpen(false)
    }

    const rootStyle = {
        width: '100%',
        marginBottom: '8px',
        zIndex: 2000
    }

    const alertStyle = {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        paddingTop: '8px',
        paddingBottom: '8px'
    }

    const closeButtonStyle = {
        color: 'rgba(0, 0, 0, 0.54)'
    }

    return (
        <div style={rootStyle}>
            <Collapse in={open}>
                <Alert
                    sx ={{ backgroundColor: 'yellow', textAlign: 'left' }}
                    severity="warning"
                    style={alertStyle}
                    action={
                        <IconButton size="small" onClick={handleClose} style={closeButtonStyle}>
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle sx={{ textAlign: 'left', color: 'warning.main' }}>Website not fully finished</AlertTitle>
                    This website is still under construction and some features may not be available yet.
                </Alert>
            </Collapse>
        </div>
    )
}

export default WebsiteNotFinishedBanner
