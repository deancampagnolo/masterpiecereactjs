import { teal } from '@mui/material/colors'
import { createTheme, responsiveFontSizes } from '@mui/material'

export const appTheme = responsiveFontSizes(createTheme({
    typography: {
        fontFamily: [
            'Quicksand',
            'Tangerine',
            'Roboto'
        ].join(','),
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: teal,
        secondary: {
            main: '#63B0CD'
        },
        warning: {
            main: '#CC2936'
        },
        background: {
            default: '#FFECD1'
        }
    }
}))

export const websiteHeaderTheme = createTheme(appTheme, {
    palette: {
        primary: {
            main: '#00B9AE'
        }

    }
})

export const sideDrawerTheme = createTheme(appTheme, {
    palette: {
        primary: {
            main: '#D7D5D5'
        }
    }
})

export const bottomBarTheme = createTheme(appTheme, {
    palette: {
        primary: {
            main: '#292929'
        }
    }
})
