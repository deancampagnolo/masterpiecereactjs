import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MetaDataInput from '../MetaDataInput'
import * as React from 'react'
import { useState } from 'react'

interface MPMetaDataProps {
    style?: React.CSSProperties
    defaultBpm: number
    onBPMChange: (bpm: number) => void
    defaultKey: string
    onKeyChange: (key: string) => void
    defaultNeeds: string[]
    onNeedsChange: (needs: string[]) => void
}

export default function MPMetaData (props: MPMetaDataProps): ReactJSXElement {
    const [bpm, setBpm] = useState(props.defaultBpm)
    const [key, setKey] = useState(props.defaultKey)
    const [needs, setNeeds] = useState(props.defaultNeeds)

    const onBpmChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newBpm = Number(e.target.value)
        setBpm(newBpm)
        props.onBPMChange(newBpm)
    }

    const onKeyChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newKey = e.target.value
        setKey(newKey)
        props.onKeyChange(newKey)
    }

    const onNeedsChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        // TODO
        setNeeds([...needs])
    }
    return (
        <div style={props.style}>
            <MetaDataInput title="BPM" defaultValue={bpm} onChange={onBpmChangeEvent}/>
            <MetaDataInput title="Key" defaultValue={key} onChange={onKeyChangeEvent}/>
            <MetaDataInput title="Needs" defaultValue={needs.join()} onChange={onNeedsChangeEvent}/>
        </div>
    )
}
