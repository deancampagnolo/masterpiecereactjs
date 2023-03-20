import { useEffect, useState } from 'react'
import { Theme } from '@mui/material'

// Updates everytime the window size changes to fit one of the breakpoints
export function useWindowBreakpointSize (theme: Theme): number {
    const [currentBP, setCurrentBP] = useState(-1)
    useEffect(() => {
        function updateSize (): void {
            const { innerWidth } = window
            let updatedBp
            switch (true) {
                case innerWidth < theme.breakpoints.values.sm:
                    updatedBp = theme.breakpoints.values.xs
                    break
                case innerWidth >= theme.breakpoints.values.sm && innerWidth < theme.breakpoints.values.md:
                    updatedBp = theme.breakpoints.values.sm
                    break
                case innerWidth >= theme.breakpoints.values.md && innerWidth < theme.breakpoints.values.lg:
                    updatedBp = theme.breakpoints.values.md
                    break
                case innerWidth >= theme.breakpoints.values.lg && innerWidth < theme.breakpoints.values.xl:
                    updatedBp = theme.breakpoints.values.lg
                    break
                default:
                    updatedBp = theme.breakpoints.values.xl
            }

            setCurrentBP(updatedBp)

            // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
            // As an inapplicable side note for this function: you cant access state inside a callback, you have to use a combination of useRef and useState
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => { window.removeEventListener('resize', updateSize) }
    }, [])
    return currentBP
}
