import React, { useEffect, useRef, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Typography from '@mui/material/Typography'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { getMpWorkspaceWidth } from '../Utils/ThemeBreakpointsUtil'
import { useWindowBreakpointSize } from '../Utils/WindowSizeUtil'

interface FadeInSectionsProps {
    children: React.ReactNode
    sx?: SxProps<Theme>
}

function FadeInSection (props: FadeInSectionsProps): ReactJSXElement {
    const [isVisible, setVisible] = useState(false)
    const [isBottomHalf, setIsBottomHalf] = useState(false)

    const domRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log(entries)
            // it may be silly to for each this, I think getting [entry] from entries is the same
            entries.forEach((entry) => {
                const boundingRect = entry.boundingClientRect
                const rootRect = entry.rootBounds as DOMRectReadOnly
                const isEntryBottomHalf = boundingRect.top > rootRect.top + rootRect.height / 2
                setIsBottomHalf(isEntryBottomHalf)
                setVisible(entry.isIntersecting)
            })
        }, { threshold: 0.7, rootMargin: '-5% 0px' })

        if (domRef.current != null) {
            observer.observe(domRef.current)
        }

        return () => {
            if (domRef.current != null) {
                observer.unobserve(domRef.current)
            }
        }
    }, [])

    return (
        <Box
            className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${isBottomHalf ? 'is-bottom-half' : ''}`}
            ref={domRef}
            sx={props.sx}
        >
            {props.children}
        </Box>
    )
}

export default function Homepage (): ReactJSXElement {
    useWindowBreakpointSize(useTheme())
    return (
        <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {/* sx padding bottom for space and  */}
            <Box display="flex" flexDirection="column" style={{ justifyContent: 'center', width: getMpWorkspaceWidth(useTheme()) }} sx={{ paddingBottom: 5 }}>
                <FadeInSection sx={{ marginTop: 16, marginBottom: 16 }}>
                    <Box>
                        <Typography variant='h3' marginBottom={4} >
                            Welcome To
                        </Typography >
                        <Typography variant='h2'>
                            Masterpiece Music
                        </Typography>
                    </Box>
                </FadeInSection>

                <FadeInSection sx={{ marginTop: 8, marginBottom: 4 }}>
                    <Typography variant='h4' paddingBottom={2}>
                        What is Masterpiece Music?
                    </Typography>
                </FadeInSection>
                <FadeInSection>
                    <img src="/Screenshot.png" alt="My Image" className="my-image" style={{ width: '100%', height: 'auto' }} />
                </FadeInSection>

                <FadeInSection >
                    <Typography variant='h6'>
                        Masterpiece Music is a great way to collaboratively create music asynchronously, requiring you to only make the parts that you are interested in!
                    </Typography>
                </FadeInSection>

                <FadeInSection sx={{ marginTop: 4, marginBottom: 4 }}>
                    <Typography variant='subtitle1'>
                        You can choose to create a new project from scratch, or get a random project someone else worked on! To get started, select your desired option in the sidebar, or click the link below
                    </Typography>
                </FadeInSection>

                <FadeInSection>
                    <Link to='/explore/1'>
                        <Typography variant='h5'>
                        Try it out :)
                        </Typography>
                    </Link>
                </FadeInSection>

                <FadeInSection sx={{ marginBottom: 16 }}>
                    <Link to='/privacyPolicy' >
                        <Typography variant='subtitle2'>
                        Privacy Policy
                        </Typography>
                    </Link>
                </FadeInSection>

            </Box>
        </Box>
    )
}
