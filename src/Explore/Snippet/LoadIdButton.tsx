import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Button, Input } from '@mui/material'
import { useState } from 'react'

interface LoadIdButtonProps {
    onLoad: (id: number) => void
}

export default function LoadIdButton (props: LoadIdButtonProps): ReactJSXElement {
    const [id, setId] = useState(-1)

    return (
        <div>
            <Input type="number" onChange={(e) => { setId(Number(e.target.value)) }}/>
            <Button onClick={() => { props.onLoad(id) }}> Load {id}</Button>
        </div>
    )
}
