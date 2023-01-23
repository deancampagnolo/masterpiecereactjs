import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useEffect, useRef, useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { Button } from '@mui/material'
import AudioControllerModel from '../Utils/AudioControllerModel'
import MPSnippetModel from './MPSnippetModel'
import MPWorkspaceContainerModel from './MPWorkspaceContainerModel'
import { FetchMP, PostMP } from '../../RestOperations/MPRestOperations'

interface MPWorkspaceContainerProps {
    ffmpeg: FFmpeg
}

export default function MPWorkspaceContainer (props: MPWorkspaceContainerProps): ReactJSXElement {
    const [containerKey, setContainerKey] = useState(Math.floor(Math.random() * 10000000))// FIXME temporary
    const [isLoaded, setIsLoaded] = useState(false)
    const [mpWorkspaceContainerModel, setMPWorkspaceContainerModel] = useState(new MPWorkspaceContainerModel(new AudioControllerModel(props.ffmpeg), []))
    const CreateNextMasterpiece = (): void => {
        setContainerKey(Math.floor(Math.random() * 10000000))// FIXME temporary
    }
    useEffect(() => {
        FetchMP(7, props.ffmpeg).then((newModel) => {
            setIsLoaded(true)
            setMPWorkspaceContainerModel(newModel)
        }).catch(e => { console.log(e) })
    }, []) // deps may include containerKey

    return (
        <div>
            { isLoaded
                ? <MPWorkspace key={containerKey} ffmpeg={props.ffmpeg} onNext={CreateNextMasterpiece}
                    initialAudioControllerModel={mpWorkspaceContainerModel.audioControllerModel}
                    initialMPSnippetModels={mpWorkspaceContainerModel.mpSnippetModels}/>
                : null
            }
        </div>
    )
}

interface MPWorkspaceProps {
    ffmpeg: FFmpeg
    onNext: () => void
    initialAudioControllerModel: AudioControllerModel
    initialMPSnippetModels: MPSnippetModel[]
}

function MPWorkspace (props: MPWorkspaceProps): ReactJSXElement {
    const audioControllerModel = useRef(props.initialAudioControllerModel)
    const [snippetControllers, setSnippetControllers] = useState(props.initialMPSnippetModels)

    const addSnippetController = (selectedFile: string): void => {
        const mpSnippetModel = new MPSnippetModel(selectedFile, selectedFile)
        audioControllerModel.current.set(mpSnippetModel.audioLocalUUID, mpSnippetModel.resourceUrl, true)
        setSnippetControllers([...snippetControllers, mpSnippetModel])
    }

    // useEffect(() => {
    //     console.log('added initial snippet controller')
    //     audioControllerModel.current.reset() // TODO: Figure out why this effect gets called multiple times
    //     // eslint-disable-next-line @typescript-eslint/no-var-requires
    //     addSnippetController(require('../../9to5.mp3'))
    // }, [])

    const onRemove = (id: number): void => {
        audioControllerModel.current.remove(id)
        setSnippetControllers(snippetControllers.filter((sc) => sc.audioLocalUUID !== id))
    }

    const onSubmit = (): void => {
        void PostMP(audioControllerModel.current.getAllUrl())
    }

    return (
        <div>
            <MPSnippetContainer onRemove={onRemove} onAdd={addSnippetController} audioControllerModel={audioControllerModel} snippetControllers={snippetControllers}
                style={
                    { backgroundColor: 'beige', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '8px', paddingRight: '8px', width: '500px' }
                }/>
            <Button onClick={props.onNext}>Next</Button>
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    )
}
