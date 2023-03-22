import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Backdrop } from '@mui/material'
import { backdropZIndex } from '../../Theme/Styles'

interface PreviewProps {
    isPreviewing: boolean
}
// FIXME Maybe backdrops isn't the correct solution. Actually I think it isn't... It prevents user from using sidebar and backdrop creation may be confusing when hiding and unhiding sidebar
//  should first design it.
export default function Preview (props: PreviewProps): ReactJSXElement {
    return (
        <Backdrop sx={{
            position: 'absolute',
            zIndex: backdropZIndex,
            color: '#ffffff',
            backgroundColor: 'preview.main'
        }} open={props.isPreviewing}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h2'>
                Preview!
                </Typography>
                <Typography variant='h6' color='preview.contrastText'>
                Accept Project to work on it
                </Typography>
            </div>
        </Backdrop>
    )
}
