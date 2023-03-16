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
        },
        subtitle2: {
            color: '#acaaaa'
        },
        h6: {
            color: '#acaaaa'
        }
    },
    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    color: '#acaaaa' // replace with your desired text color
                },
                underline: {
                    '&:before': {
                        borderBottom: '2px solid #333333' // replace with your desired underline color
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid #666666' // replace with your desired underline color on hover
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: '#acaaaa' // replace with your desired text color
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#acaaaa' // replace with your desired icon color
                }
            }
        }
    },
    palette: {
        primary: teal,
        secondary: {
            main: '#acaaaa'
        },
        warning: {
            main: '#d13e4a'
        },
        background: {
            default: '#191919'
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
            main: '#141414'
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

export const snippetContainerTheme = createTheme(appTheme, {
    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    color: '#292929' // replace with your desired text color
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#292929' // replace with your desired icon color
                }
            }
        }
    }
})
