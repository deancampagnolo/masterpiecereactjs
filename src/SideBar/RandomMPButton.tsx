import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useNavigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { GetRandomMP } from '../RestOperations/MPRestOperations'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'

const defaultLinkObj = { isActive: false, id: -1 }

interface RandomMPButtonProps {
    theButton: ReactNode
    shouldAlert: boolean
}

export default function RandomMPButton (props: RandomMPButtonProps): ReactJSXElement {
    const [linkObj, setLinkObj] = useState(defaultLinkObj)
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (linkObj.isActive) {
            navigate('/explore/' + linkObj.id.toString())
            setLinkObj(defaultLinkObj)
        }
    }, [linkObj])

    const goToRandomMP = (): void => {
        AudioControllerModelHelper.getInstance().pauseMasterGuaranteed().then(() => {
            setOpen(false)
            GetRandomMP().then((newId) => {
                if (newId != null) {
                    setLinkObj({
                        isActive: true,
                        id: newId
                    })
                }
            }).catch(console.error)
        }).catch(console.error)
    }

    const onClick = (): void => {
        if (props.shouldAlert) {
            setOpen(true)
        } else {
            goToRandomMP()
        }
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Abandon</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave the project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={goToRandomMP}>Continue</Button>
                </DialogActions>
            </Dialog>
            <div onClick={onClick} >
                {props.theButton}
            </div>
        </div>
    )
}
