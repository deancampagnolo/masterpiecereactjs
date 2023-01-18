import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useEffect, useRef, useState } from 'react'
import MPSnippetModel from './MPSnippetModel'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import AudioControllerModel from '../Utils/AudioControllerModel'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
    ffmpeg: FFmpeg
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    const audioControllerModel = useRef(new AudioControllerModel(props.ffmpeg))

    const [snippetControllers, setSnippetControllers] = useState([] as MPSnippetModel[])

    const addSnippetController = (selectedFile: string): void => {
        const mpSnippetModel = new MPSnippetModel(selectedFile, selectedFile)
        audioControllerModel.current.set(mpSnippetModel.id, mpSnippetModel.resourceUrl)
        setSnippetControllers([...snippetControllers, mpSnippetModel])
    }

    useEffect(() => {
        console.log('added initial snippet controller')
        audioControllerModel.current.reset() // TODO: Figure out why this effect gets called multiple times
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        addSnippetController(require('../../9to5.mp3'))
    }, [])

    // const onRemove = useCallback((index: number) => { snippetControllers.splice(index, 1); setSnippetControllers([...snippetControllers]) }, [])
    const onRemove = (id: number): void => {
        audioControllerModel.current.remove(id)
        setSnippetControllers(snippetControllers.filter((sc) => sc.id !== id))
    }

    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
                {snippetControllers.map((item, index) => {
                    return (
                        <MPSnippet key={item.id} title={item.name} audioController={audioControllerModel.current.get(item.id)}
                            onRemove={() => { onRemove(item.id) }}/>
                    )
                })}
                <MPSnippet title='Master' audioController={audioControllerModel.current.get(0)} onRemove={() => {}} removeEnabled={false}/>
                <MPAddSnippet title="add audio file here" submitOnClick={addSnippetController }/>
            </Box>
        </div>
    )
}
