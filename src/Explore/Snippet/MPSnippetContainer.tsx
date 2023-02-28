import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

import MPSnippetModel from './MPSnippetModel'

import { AudioControllerModelHelper, NudgeType } from '../../Utils/AudioControllerModel'
import { useEffect } from 'react'
import { TimeObject } from 'tone/build/esm/core/type/Units'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
    snippetControllers: MPSnippetModel[]
    onRemove: (item: number) => void
    onAdd: (selectedFiles: string[]) => void
    onSnippetTitleChange: (id: number, title: string) => void
    isPreview: boolean
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    const onMute = (id: number): void => {
        AudioControllerModelHelper.getInstance().toggleMuteAudio(id)
    }
    const onSolo = (): void => {}
    const onVolumeChange = (id: number, dbs: number, snippetController?: MPSnippetModel): void => {
        if (snippetController != null) {
            snippetController.volume = dbs
        }
        AudioControllerModelHelper.getInstance().setVolume(id, dbs)
    }

    const onNudge = (id: number, nudge: NudgeType, snippetController?: MPSnippetModel): void => {
        const nudgeAmountObject = AudioControllerModelHelper.getInstance().nudgeAudio(id, nudge)
        console.log('nudge Amount Object')
        console.log(nudgeAmountObject)
        if (snippetController != null && nudgeAmountObject != null) {
            snippetController.nudgeAmountObject = nudgeAmountObject
        }
        console.log(snippetController)
    }

    const setNudge = (id: number, nudge: TimeObject): void => {
        AudioControllerModelHelper.getInstance().setNudgeObject(id, nudge)
    }

    useEffect(() => {
        props.snippetControllers.forEach((value) => {
            onVolumeChange(value.audioLocalUUID, value.volume)
            setNudge(value.audioLocalUUID, value.nudgeAmountObject)
        })
    }, [props.isPreview])

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
            {props.snippetControllers.map((item, index) => {
                return (
                    <MPSnippet key={item.audioLocalUUID} title={item.name}
                        onRemove={() => { props.onRemove(item.audioLocalUUID) }} onMute={() => { onMute(item.audioLocalUUID) }}
                        onSolo={onSolo} onSnippetTitleChange={(title) => { props.onSnippetTitleChange(item.audioLocalUUID, title) }}
                        onVolumeChange={(dbs) => { onVolumeChange(item.audioLocalUUID, dbs, item) }} initialVolume={item.volume}
                        onNudge={(nudge) => { onNudge(item.audioLocalUUID, nudge, item) }}/>
                )
            })}
            <MPAddSnippet title="add audio file(s) here" submitOnClick={props.onAdd }/>
        </Box>

    )
}
