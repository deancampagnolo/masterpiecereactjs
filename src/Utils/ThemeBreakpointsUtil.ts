import { Theme } from '@mui/material'

export const getDrawerWidth = (theme: Theme): number => {
    const { innerWidth, innerHeight } = window

    switch (true) {
        case innerHeight > innerWidth:
            console.log('portrait')
            return innerWidth
        case innerWidth < theme.breakpoints.values.sm:
            console.log('xs')
            return innerWidth
        case innerWidth >= theme.breakpoints.values.sm && innerWidth < theme.breakpoints.values.md:
            console.log('sm')
            return theme.drawerWidth.sm
        case innerWidth >= theme.breakpoints.values.md && innerWidth < theme.breakpoints.values.lg:
            console.log('md')
            return theme.drawerWidth.md
        case innerWidth >= theme.breakpoints.values.lg && innerWidth < theme.breakpoints.values.xl:
            console.log('lg')
            return theme.drawerWidth.lg
        default:
            console.log('xl')
            return theme.drawerWidth.xl
    }
}

export const getMpWorkspaceWidth = (theme: Theme): string => {
    const { innerWidth, innerHeight } = window

    switch (true) {
        case innerHeight > innerWidth:
            console.log('portrait')
            return theme.mpWorkspaceWidth.xs
        case innerWidth < theme.breakpoints.values.sm:
            console.log('xs')
            return theme.mpWorkspaceWidth.xs
        case innerWidth >= theme.breakpoints.values.sm && innerWidth < theme.breakpoints.values.md:
            console.log('sm')
            return theme.mpWorkspaceWidth.sm
        case innerWidth >= theme.breakpoints.values.md && innerWidth < theme.breakpoints.values.lg:
            console.log('md')
            return theme.mpWorkspaceWidth.md
        case innerWidth >= theme.breakpoints.values.lg && innerWidth < theme.breakpoints.values.xl:
            console.log('lg')
            return theme.mpWorkspaceWidth.lg
        default:
            console.log('xl')
            return theme.mpWorkspaceWidth.xl
    }
}
