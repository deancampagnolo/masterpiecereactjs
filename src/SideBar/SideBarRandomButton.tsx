import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useNavigate } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Casino } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { GetRandomMP } from '../RestOperations/MPRestOperations'

const defaultLinkObj = { isActive: false, id: -1 }

export default function SideBarRandomButton (): ReactJSXElement {
    const [linkObj, setLinkObj] = useState(defaultLinkObj)
    const navigate = useNavigate()
    useEffect(() => {
        if (linkObj.isActive) {
            console.log('hi')
            navigate('/explore/' + linkObj.id.toString())
            setLinkObj(defaultLinkObj)
        }
    }, [linkObj])

    const onClick = (): void => {
        GetRandomMP().then((newId) => {
            if (newId != null) {
                setLinkObj({ isActive: true, id: newId })
            }
        }).catch(console.error)
    }

    return (
        <ListItemButton onClick={onClick}>
            <ListItemIcon ><Casino /></ListItemIcon>
            <ListItemText primary='Random' />
        </ListItemButton>
    )
}
