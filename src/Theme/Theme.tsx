import { teal } from '@mui/material/colors'
import { createTheme, responsiveFontSizes } from '@mui/material'

declare module '@mui/material/styles' {
    interface Theme {
        drawerWidth: {
            sm: number
            md: number
            lg: number
            xl: number
        }
        mpWorkspaceWidth: {
            xs: string
            sm: string
            md: string
            lg: string
            xl: string
        }
    }
    interface ThemeOptions {
        drawerWidth?: {
            xs?: number
            sm?: number
            md?: number
            lg?: number
            xl?: number
        }
        mpWorkspaceWidth?: {
            xs?: string
            sm?: string
            md?: string
            lg?: string
            xl?: string
        }
    }
}

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
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1921
        }
    },
    drawerWidth: {
        sm: 200,
        md: 250,
        lg: 250,
        xl: 300
    },
    mpWorkspaceWidth: {
        xs: '90%',
        sm: '90%',
        md: '80%',
        lg: '50%',
        xl: '40%'
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
