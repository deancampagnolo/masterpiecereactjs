import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

import MPSnippetModel from './MPSnippetModel'

import AudioControllerModel from '../Utils/AudioControllerModel'
import MPSnippetMaster from './MPSnippetMaster'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
    snippetControllers: MPSnippetModel[]
    audioControllerModel: React.MutableRefObject<AudioControllerModel>
    onRemove: (item: number) => void
    onAdd: (selectedFile: string) => void
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    const onMute = (id: number): void => {
        props.audioControllerModel.current.toggleMuteAudio(id)
    }
    const onSolo = (): void => {}
    const onPlayPause = (): void => {
        props.audioControllerModel.current.toggleMaster()
    }
    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
                {props.snippetControllers.map((item, index) => {
                    return (
                        <MPSnippet key={item.audioLocalUUID} title={item.name}
                            onRemove={() => { props.onRemove(item.audioLocalUUID) }} onMute={() => { onMute(item.audioLocalUUID) }} onSolo={onSolo}/>
                    )
                })}
                <MPSnippetMaster title='Master' onPlayPause={onPlayPause}/>
                <MPAddSnippet title="add audio file here" submitOnClick={props.onAdd }/>
                <button onClick={props.audioControllerModel.current.start}>start</button>
            </Box>
        </div>
    )
}
