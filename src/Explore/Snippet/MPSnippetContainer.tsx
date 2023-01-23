import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

import MPSnippetModel from './MPSnippetModel'

import AudioControllerModel from '../Utils/AudioControllerModel'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
    snippetControllers: MPSnippetModel[]
    audioControllerModel: React.MutableRefObject<AudioControllerModel>
    onRemove: (item: number) => void
    onAdd: (selectedFile: string) => void
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
                {props.snippetControllers.map((item, index) => {
                    return (
                        <MPSnippet key={item.audioLocalUUID} title={item.name} audioController={props.audioControllerModel.current.get(item.audioLocalUUID)}
                            onRemove={() => { props.onRemove(item.audioLocalUUID) }}/>
                    )
                })}
                <MPSnippet title='Master' audioController={props.audioControllerModel.current.get(0)} onRemove={() => {}} removeEnabled={false}/>
                <MPAddSnippet title="add audio file here" submitOnClick={props.onAdd }/>
            </Box>
        </div>
    )
}
