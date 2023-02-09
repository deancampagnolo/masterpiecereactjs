import * as React from 'react'
import { Box, Slider, SliderThumb, styled } from '@mui/material'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 10,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&.second-thumb': {
            border: '2px dashed purple'
        },
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)'
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            marginLeft: 1,
            marginRight: 1
        },
        '&.first-thumb .airbnb-bar': {
            backgroundColor: 'red'
        },
        '&.second-thumb .airbnb-bar': {
            backgroundColor: 'currentColor'
        }
    },
    '& .MuiSlider-track': {
        height: 3
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3
    }
}))

function AirbnbThumbComponent (props) {
    // eslint-disable-next-line react/prop-types
    const { children, className, ...other } = props
    const extraClassName =
        other['data-index'] === 0 ? 'first-thumb' : 'second-thumb'
    return (
        <SliderThumb {...other} className={clsx(className, extraClassName)}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    )
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node
}

export default function CustomizedSlider () {
    return (
        <Box sx={{ width: 320 }}>
            <Typography gutterBottom>Airbnb</Typography>
            <AirbnbSlider
                components={{ Thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) =>
                    index === 0 ? 'Minimum price' : 'Maximum price'
                }
                defaultValue={[20, 40]}
            />
        </Box>
    )
}
