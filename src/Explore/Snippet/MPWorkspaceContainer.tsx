import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, Input, Slider } from '@mui/material'
import MPSnippetModel from './MPSnippetModel'
import MPWorkspaceContainerModel from './MPWorkspaceContainerModel'
import { FetchMP, PostMP } from '../../RestOperations/MPRestOperations'
import LoadIdButton from './LoadIdButton'
import Typography from '@mui/material/Typography'
import AudioControllerModel from '../Utils/AudioControllerModel'

export default function MPWorkspaceContainer (): ReactJSXElement {
    console.log('MpWorkspace Load')
    const [containerKey, setContainerKey] = useState(Math.floor(Math.random() * 10000000))// FIXME temporary
    const [isLoaded, setIsLoaded] = useState(false)

    const [mpWorkspaceContainerModel, setMPWorkspaceContainerModel] =
        useState(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())

    const CreateBlankMasterpiece = (): void => {
        setContainerKey(Math.floor(Math.random() * 10000000))// FIXME temporary
        setMPWorkspaceContainerModel(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())
    }
    const LoadNextMasterpiece = (songId: number): void => {
        setIsLoaded(false)
        FetchMP(songId).then((newModel) => {
            setContainerKey(Math.floor(Math.random() * 10000000))// FIXME temporary
            setMPWorkspaceContainerModel(newModel)
            setIsLoaded(true)
        }).catch(e => { console.error(e) })
    }
    useEffect(() => {
        // CreateBlankMasterpiece()
        // setIsLoaded(true)
        console.log('Loading Next Masterpiece')
        LoadNextMasterpiece(1)
    }, []) // deps may include containerKey

    return (
        <div>
            { isLoaded
                ? <MPWorkspace key={containerKey} onCompose={CreateBlankMasterpiece} onLoad={LoadNextMasterpiece}
                    initialAudioControllerModel={mpWorkspaceContainerModel.audioControllerModel}
                    initialMPSnippetModels={mpWorkspaceContainerModel.mpSnippetModels}/>
                : null
            }
            <button onClick={() => {
                console.log('button Pressed')
            }}/>
        </div>
    )
}

interface MPWorkspaceProps {
    onCompose: () => void
    onLoad: (songId: number) => void
    initialAudioControllerModel: AudioControllerModel
    initialMPSnippetModels: MPSnippetModel[]
}

function MPWorkspace (props: MPWorkspaceProps): ReactJSXElement {
    const audioControllerModel = useRef(props.initialAudioControllerModel)
    const [snippetControllers, setSnippetControllers] = useState(props.initialMPSnippetModels)
    const [bpm, setBpm] = useState(100)

    const addSnippetController = (selectedFile: string): void => {
        const mpSnippetModel = new MPSnippetModel(selectedFile)
        audioControllerModel.current.addAudio(mpSnippetModel.audioLocalUUID, selectedFile, '0', '6m')
        setSnippetControllers([...snippetControllers, mpSnippetModel])
    }

    const onRemove = (id: number): void => {
        audioControllerModel.current.removeAudio(id)
        setSnippetControllers(snippetControllers.filter((sc) => sc.audioLocalUUID !== id))
    }

    const onSubmit = (): void => {
        void PostMP(audioControllerModel.current.getAllUrl())
    }

    return (
        <div>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Typography>
                    BPM:&nbsp;
                </Typography>
                <Input type="text" defaultValue={bpm} onChange={(e) => { setBpm(Number(e.target.value)) }}/>
            </Box>
            <MPSnippetContainer onRemove={onRemove} onAdd={addSnippetController} audioControllerModel={audioControllerModel} snippetControllers={snippetControllers}
                style={
                    { backgroundColor: 'beige', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '8px', paddingRight: '8px', width: '500px' }
                }/>
            <Slider/>
            <Button onClick={props.onCompose}>Compose</Button>
            <LoadIdButton onLoad={props.onLoad}/>
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    )
}
