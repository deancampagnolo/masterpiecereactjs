import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MetaDataInput from '../MetaDataInput'
import * as React from 'react'

interface MPMetaDataProps {
    style?: React.CSSProperties
    defaultBpm: number
    onBPMChange: (bpm: number) => void
}

export default function MPMetaData (props: MPMetaDataProps): ReactJSXElement {
    return (
        <div style={props.style}>
            <MetaDataInput title="BPM" defaultValue={props.defaultBpm} onChange={(e) => { Number(e.target.value) }}/>
            <MetaDataInput title="Key" defaultValue="C#"/>
            <MetaDataInput title="Needs" defaultValue="Drums; Guitar; Vocals"/>
        </div>
    )
}
