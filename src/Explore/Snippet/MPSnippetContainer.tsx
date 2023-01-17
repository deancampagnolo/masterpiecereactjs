import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useEffect, useRef, useState } from 'react'
import MPSnippetModel from './MPSnippetModel'
import AudioControllerModel from '../Utils/AudioControllerModel'
import { FFmpeg } from '@ffmpeg/ffmpeg'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
    ffmpeg: FFmpeg
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const audioControllers = useRef([new AudioController(require('../../9to5.mp3')), new AudioController(require('../../abc.wav'))])
    // audioControllers.current.push()

    const audioControllerModel = useRef(new AudioControllerModel(props.ffmpeg))

    /* eslint-disable @typescript-eslint/no-var-requires */
    // const [snippetControllers, setSnippetControllers] = useState([new MPSnippetModel('a', require('../../9to5.mp3')),
    //     new MPSnippetModel('b', require('../../abc.wav')), new MPSnippetModel('c', require('../../9to5.mp3')),
    //     new MPSnippetModel('d', require('../../abc.wav'))])
    const [snippetControllers, setSnippetControllers] = useState([] as MPSnippetModel[])

    const addSnippetController = (selectedFile: string): void => {
        const mpSnippetModel = new MPSnippetModel(selectedFile, selectedFile)
        audioControllerModel.current.set(mpSnippetModel.id, mpSnippetModel.resourceUrl)
        setSnippetControllers([...snippetControllers, mpSnippetModel])
    }

    useEffect(() => {
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
