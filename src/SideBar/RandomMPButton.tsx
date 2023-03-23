import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useNavigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { GetRandomMP } from '../RestOperations/MPRestOperations'

const defaultLinkObj = { isActive: false, id: -1 }

interface RandomMPButtonProps {
    theButton: ReactNode
}

export default function RandomMPButton (props: RandomMPButtonProps): ReactJSXElement {
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
        <div onClick={onClick}>
            {props.theButton}
        </div>
    )
}
