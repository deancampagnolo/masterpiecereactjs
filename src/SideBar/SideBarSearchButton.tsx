import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

interface SideBarSearchButtonProps {
    onButtonClick: () => void
}

export default function SideBarSearchButton (props: SideBarSearchButtonProps): ReactJSXElement {
    const [open, setOpen] = React.useState(false)
    const [id, setId] = React.useState(NaN)

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
        props.onButtonClick()
    }

    return (
        <div>
            <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon ><Search /></ListItemIcon>
                <ListItemText primary='Search' />
            </ListItemButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the id of the project you want to view
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id number"
                        label="id number"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setId(Number(e.target.value)) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {(isNaN(id)) // TODO should be restricting numbers rather than hiding submit button
                        ? null
                        : <Link to={'/explore/' + id.toString()} style={{ textDecoration: 'none' }}>
                            <Button onClick={handleClose}>Submit</Button>
                        </Link>}
                </DialogActions>
            </Dialog>
        </div>
    )
}
