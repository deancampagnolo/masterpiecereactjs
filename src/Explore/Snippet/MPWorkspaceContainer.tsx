import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import MPSnippetModel from './MPSnippetModel'
import MPWorkspaceContainerModel from './MPWorkspaceContainerModel'
import { FetchMP, PostMP } from '../../RestOperations/MPRestOperations'
import LoadIdButton from './LoadIdButton'
import AudioControllerModel from '../Utils/AudioControllerModel'
import MPTitle from './MPTitle'
import MPModel from './MPModel'
import MPMetaData from './MPMetaData'

export default function MPWorkspaceContainer (): ReactJSXElement {
    console.log('MpWorkspace Load')
    const [containerKey, setContainerKey] = useState(Math.floor(Math.random() * 10000000))// FIXME temporary
    const [isLoaded, setIsLoaded] = useState(false)

    const [mpWorkspaceContainerModel, setMPWorkspaceContainerModel] =
        useState(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())

    const CreateBlankMasterpiece = (): void => {
        mpWorkspaceContainerModel.audioControllerModel.clear()
        setContainerKey(Math.floor(Math.random() * 10000000))// FIXME temporary
        setMPWorkspaceContainerModel(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())
    }
    const LoadNextMasterpiece = (songId: number): void => {
        setIsLoaded(false)
        mpWorkspaceContainerModel.audioControllerModel.clear()
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
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            { isLoaded
                ? <MPWorkspace key={containerKey} onCompose={CreateBlankMasterpiece} onLoad={LoadNextMasterpiece}
                    initialAudioControllerModel={mpWorkspaceContainerModel.audioControllerModel}
                    initialMPSnippetModels={mpWorkspaceContainerModel.mpSnippetModels}
                    initialMPModel={mpWorkspaceContainerModel.mpModel}/>
                : null
            }
        </div>
    )
}

interface MPWorkspaceProps {
    onCompose: () => void
    onLoad: (songId: number) => void
    initialAudioControllerModel: AudioControllerModel
    initialMPSnippetModels: MPSnippetModel[]
    initialMPModel: MPModel
}

function MPWorkspace (props: MPWorkspaceProps): ReactJSXElement {
    const audioControllerModel = useRef(props.initialAudioControllerModel)
    const [snippetControllers, setSnippetControllers] = useState(props.initialMPSnippetModels)
    const mpModel = useRef(props.initialMPModel)
    const [bpm, setBpm] = useState(100)

    const addSnippetController = (selectedFile: string): void => {
        const mpSnippetModel = new MPSnippetModel(selectedFile)
        audioControllerModel.current.pauseMaster()
        audioControllerModel.current.addAudio(mpSnippetModel.audioLocalUUID, selectedFile, '0')
        setSnippetControllers([...snippetControllers, mpSnippetModel])
    }

    const onRemove = (id: number): void => {
        audioControllerModel.current.removeAudio(id)
        setSnippetControllers(snippetControllers.filter((sc) => sc.audioLocalUUID !== id))
    }

    const onSubmit = (): void => {
        void PostMP(audioControllerModel.current.getAllUrl(), snippetControllers, mpModel.current)
    }

    const onSnippetTitleChange = (id: number, title: string): void => {
        snippetControllers.filter((value) => value.audioLocalUUID === id).forEach((value) => { value.name = title })
    }
    const onTitleChange = (title: string): void => {
        mpModel.current.title = title
    }

    return (
        <div style={{ width: '30%' }}>
            <MPTitle onTitleChange={onTitleChange} defaultTitle={mpModel.current.title}/>
            <MPMetaData style={{ marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh' }} defaultBpm={bpm} onBPMChange={(newBpm) => { setBpm(newBpm) }}/>
            <MPSnippetContainer onRemove={onRemove} onAdd={addSnippetController} snippetControllers={snippetControllers}
                onSnippetTitleChange={onSnippetTitleChange}/>
            <Box display="flex" flexDirection="row" sx={{ justifyContent: 'center' }}>
                <Button> Submit Masterpiece</Button>
                <Button color={'warning'}> Abandon </Button>
            </Box>
            <Button onClick={props.onCompose}>Compose</Button>
            <LoadIdButton onLoad={props.onLoad}/>
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    )
}
