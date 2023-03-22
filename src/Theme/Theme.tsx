import { teal } from '@mui/material/colors'
import { createTheme, PaletteColor, PaletteColorOptions, responsiveFontSizes } from '@mui/material'
import { darkIconColor, darkTextColor, iconColor, textColor, underlineColorBefore, underlineColorHover } from './Colors'

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
    interface Palette {
        preview: PaletteColor
    }
    interface PaletteOptions {
        preview?: PaletteColorOptions
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
        allVariants: {
            color: textColor
        }
    },
    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    color: textColor
                },
                underline: {
                    '&:before': {
                        borderBottom: '2px solid ' + underlineColorBefore
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid ' + underlineColorHover
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: textColor
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: iconColor
                }
            }
        },
        MuiButton: {
            defaultProps: {
                size: 'large'
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
        },
        preview: {
            main: 'rgb(0,0,0,0.55)',
            contrastText: '#ffcccc'
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
        xl: 250
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
            main: '#222222'
        }
    }
})

export const snippetContainerTheme = createTheme(appTheme, {
    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    color: darkTextColor
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: darkIconColor
                }
            }
        }
    },
    typography: {
        // all variants doesn't work here for some reason
        body1: {
            color: darkTextColor
        }

    }
})
