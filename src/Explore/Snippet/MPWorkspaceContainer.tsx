import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import MPSnippetModel from './MPSnippetModel'
import MPWorkspaceContainerModel from './MPWorkspaceContainerModel'
import { FetchMP, PostMP } from '../../RestOperations/MPRestOperations'
import AudioControllerModel from '../Utils/AudioControllerModel'
import MPTitle from './MPTitle'
import MPModel from './MPModel'
import MPMetaData from './MPMetaData'
import Typography from '@mui/material/Typography'

interface MPWorkspaceContainerProps {
    id: number
}

export default function MPWorkspaceContainer (props: MPWorkspaceContainerProps): ReactJSXElement {
    console.log('MpWorkspace Load')
    const [isLoaded, setIsLoaded] = useState(false)

    const [mpWorkspaceContainerModel, setMPWorkspaceContainerModel] =
        useState(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())

    const CreateBlankMasterpiece = (): void => {
        mpWorkspaceContainerModel.audioControllerModel.clear()
        setMPWorkspaceContainerModel(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())
    }
    const LoadNextMasterpiece = (songId: number): void => {
        setIsLoaded(false)
        mpWorkspaceContainerModel.audioControllerModel.clear()
        FetchMP(songId).then((newModel) => {
            setMPWorkspaceContainerModel(newModel)
            setIsLoaded(true)
        }).catch(e => { console.error(e) })
    }
    useEffect(() => {
        // CreateBlankMasterpiece()
        // setIsLoaded(true)
        console.log('Loading Next Masterpiece')
        if (props.id === -1) {
            CreateBlankMasterpiece()
        } else {
            LoadNextMasterpiece(props.id)
        }
    }, []) // deps may include containerKey, maybe props.id

    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            { isLoaded
                ? <MPWorkspace onCompose={CreateBlankMasterpiece}
                    initialAudioControllerModel={mpWorkspaceContainerModel.audioControllerModel}
                    initialMPSnippetModels={mpWorkspaceContainerModel.mpSnippetModels}
                    initialMPModel={mpWorkspaceContainerModel.mpModel}/>
                : <Typography variant='h6'>
                    loading...
                </Typography>
            }
        </div>
    )
}

interface MPWorkspaceProps {
    onCompose: () => void
    initialAudioControllerModel: AudioControllerModel
    initialMPSnippetModels: MPSnippetModel[]
    initialMPModel: MPModel
}

function MPWorkspace (props: MPWorkspaceProps): ReactJSXElement {
    const audioControllerModel = useRef(props.initialAudioControllerModel)
    const [snippetControllers, setSnippetControllers] = useState(props.initialMPSnippetModels)
    const mpModel = useRef(props.initialMPModel)

    const addSnippetController = (selectedFiles: string[]): void => {
        audioControllerModel.current.pauseMaster()
        const mpSnippetModels = [] as MPSnippetModel[]
        selectedFiles.forEach((file) => {
            const mpSnippetModel = new MPSnippetModel(file)
            audioControllerModel.current.addAudio(mpSnippetModel.audioLocalUUID, file, '0')
            mpSnippetModels.push(mpSnippetModel)
        })

        setSnippetControllers([...snippetControllers, ...mpSnippetModels])
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
    const onBPMChange = (newBpm: number): void => {
        mpModel.current.bpm = newBpm
    }
    const onKeyChange = (newKey: string): void => {
        mpModel.current.key = newKey
    }
    const onNeedsChange = (newNeeds: string[]): void => {
        mpModel.current.neededInstruments = newNeeds
    }

    return (
        <div style={{ width: '30%' }}>
            <MPTitle onTitleChange={onTitleChange} defaultTitle={mpModel.current.title}/>
            <MPMetaData style={{ marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh' }}
                defaultBpm={mpModel.current.bpm} onBPMChange={onBPMChange} defaultKey={mpModel.current.key} onKeyChange={onKeyChange}
                defaultNeeds={mpModel.current.neededInstruments} onNeedsChange={onNeedsChange}/>
            <MPSnippetContainer onRemove={onRemove} onAdd={addSnippetController} snippetControllers={snippetControllers}
                onSnippetTitleChange={onSnippetTitleChange}/>
            <Box display="flex" flexDirection="row" sx={{ justifyContent: 'center' }}>
                <Button> Submit Masterpiece</Button>
                <Button color={'warning'}> Abandon </Button>
            </Box>
            <Button onClick={props.onCompose}>Compose</Button>
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    )
}
