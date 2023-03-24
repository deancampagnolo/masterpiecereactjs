import React, { useEffect, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { GetMPTitle } from '../RestOperations/MPRestOperations'

interface MPLinkProps {
    mpId: number
}

export default function MPLink (props: MPLinkProps): ReactJSXElement {
    const [title, setTitle] = useState(props.mpId.toString())

    useEffect(() => {
        GetMPTitle(props.mpId).then(
            res => {
                if (res != null) {
                    setTitle(res)
                }
            }
        ).catch(console.error)
    }, [])

    return (
        <Link to={'/explore/' + props.mpId.toString()} style={{ textDecoration: 'none' }}>
            <ListItemButton>
                <ListItemText primary={title} />
            </ListItemButton>
        </Link>
    )
}
