import { Theme } from '@mui/material'

export const getDrawerWidth = (theme: Theme): number => {
    const { innerWidth, innerHeight } = window

    switch (true) {
        case innerHeight > innerWidth:
            return innerWidth
        case innerWidth < theme.breakpoints.values.sm:
            return innerWidth
        case innerWidth >= theme.breakpoints.values.sm && innerWidth < theme.breakpoints.values.md:
            return theme.drawerWidth.sm
        case innerWidth >= theme.breakpoints.values.md && innerWidth < theme.breakpoints.values.lg:
            return theme.drawerWidth.md
        case innerWidth >= theme.breakpoints.values.lg && innerWidth < theme.breakpoints.values.xl:
            return theme.drawerWidth.lg
        default:
            return theme.drawerWidth.xl
    }
}

export const getMpWorkspaceWidth = (theme: Theme): string => {
    const { innerWidth, innerHeight } = window

    switch (true) {
        case innerHeight > innerWidth:
            return theme.mpWorkspaceWidth.xs
        case innerWidth < theme.breakpoints.values.sm:
            return theme.mpWorkspaceWidth.xs
        case innerWidth >= theme.breakpoints.values.sm && innerWidth < theme.breakpoints.values.md:
            return theme.mpWorkspaceWidth.sm
        case innerWidth >= theme.breakpoints.values.md && innerWidth < theme.breakpoints.values.lg:
            return theme.mpWorkspaceWidth.md
        case innerWidth >= theme.breakpoints.values.lg && innerWidth < theme.breakpoints.values.xl:
            return theme.mpWorkspaceWidth.lg
        default:
            return theme.mpWorkspaceWidth.xl
    }
}
