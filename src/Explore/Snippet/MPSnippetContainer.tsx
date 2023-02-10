import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

import MPSnippetModel from './MPSnippetModel'

import { AudioControllerModelHelper } from '../Utils/AudioControllerModel'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
    snippetControllers: MPSnippetModel[]
    onRemove: (item: number) => void
    onAdd: (selectedFiles: string[]) => void
    onSnippetTitleChange: (id: number, title: string) => void
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    const onMute = (id: number): void => {
        AudioControllerModelHelper.getInstance().toggleMuteAudio(id)
    }
    const onSolo = (): void => {}
    const onVolumeChange = (id: number, dbs: number): void => {
        AudioControllerModelHelper.getInstance().setVolume(id, dbs)
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
            {props.snippetControllers.map((item, index) => {
                return (
                    <MPSnippet key={item.audioLocalUUID} title={item.name}
                        onRemove={() => { props.onRemove(item.audioLocalUUID) }} onMute={() => { onMute(item.audioLocalUUID) }}
                        onSolo={onSolo} onSnippetTitleChange={(title) => { props.onSnippetTitleChange(item.audioLocalUUID, title) }}
                        onVolumeChange={(dbs) => { onVolumeChange(item.audioLocalUUID, dbs) }}/>
                )
            })}
            <MPAddSnippet title="add audio file(s) here" submitOnClick={props.onAdd }/>
        </Box>

    )
}
