import { styled } from '@mui/material'
import { drawerWidth } from '../Theme/Styles'

export const MPMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open: boolean
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: drawerWidth
    })
}))
