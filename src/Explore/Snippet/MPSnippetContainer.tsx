import * as React from 'react'

import { Box } from '@mui/material'
import MPSnippet from './MPSnippet'
import MPAddSnippet from './MPAddSnippet'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRef, useState } from 'react'
import AudioController from '../Utils/AudioController'
import MPSnippetModel from './MPSnippetModel'

interface MPSnippetContainerProps {
    style?: React.CSSProperties
}

export default function MPSnippetContainer (props: MPSnippetContainerProps): ReactJSXElement {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const audioControllers = useRef([new AudioController(require('../../9to5.mp3')), new AudioController(require('../../abc.wav'))])
    audioControllers.current.push()

    /* eslint-disable @typescript-eslint/no-var-requires */
    const [snippetControllers, setSnippetControllers] = useState([new MPSnippetModel('a', new AudioController(require('../../9to5.mp3'))),
        new MPSnippetModel('b', new AudioController(require('../../abc.wav'))), new MPSnippetModel('c', new AudioController(require('../../9to5.mp3'))),
        new MPSnippetModel('d', new AudioController(require('../../abc.wav')))])

    const addSnippetController = (selectedFile: string): void => {
        setSnippetControllers([...snippetControllers, new MPSnippetModel(selectedFile, new AudioController(selectedFile))])
    }

    // const onRemove = useCallback((index: number) => { snippetControllers.splice(index, 1); setSnippetControllers([...snippetControllers]) }, [])
    const onRemove = (id: number): void => { setSnippetControllers(snippetControllers.filter((sc) => sc.id !== id)) }

    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
                {snippetControllers.map((item, index) => {
                    return (
                        <MPSnippet key={item.id} title={item.name} audioController={item.audioController}
                            onRemove={() => { onRemove(item.id) }}/>
                    )
                })}
                <MPAddSnippet title="add audio file here" submitOnClick={addSnippetController }/>
            </Box>
        </div>
    )
}
