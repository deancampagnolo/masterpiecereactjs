import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import MPSnippetModel from './MPSnippetModel'
import MPWorkspaceContainerModel from './MPWorkspaceContainerModel'
import { FetchMP, PostMP } from '../../RestOperations/MPRestOperations'
import AudioControllerModel, { AudioControllerModelHelper } from '../../Utils/AudioControllerModel'
import MPTitle from './MPTitle'
import MPModel from './MPModel'
import MPMetaData from './MPMetaData'
import Typography from '@mui/material/Typography'
import RecordingBackdrop from '../../RecordingBackdrop'

interface MPWorkspaceContainerProps {
    id: number
}

export default function MPWorkspaceContainer (props: MPWorkspaceContainerProps): ReactJSXElement {
    const [workspaceKey, setWorkspaceKey] = useState(Date.now())
    console.log('MpWorkspace Load')
    const [isLoaded, setIsLoaded] = useState(false)

    const [mpWorkspaceContainerModel, setMPWorkspaceContainerModel] =
        useState(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())

    const CreateBlankMasterpiece = (): void => {
        mpWorkspaceContainerModel.audioControllerModel.clear()
        setMPWorkspaceContainerModel(MPWorkspaceContainerModel.BlankMPWorkspaceContainerModel())
        setIsLoaded(true)
    }
    const LoadNextMasterpiece = (songId: number): void => {
        setIsLoaded(false)
        mpWorkspaceContainerModel.audioControllerModel.clear()
        FetchMP(songId).then((newModel) => {
            setMPWorkspaceContainerModel(newModel)
            setIsLoaded(true)
            setWorkspaceKey(Date.now())
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
                ? <MPWorkspace
                    key={workspaceKey}
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
    initialAudioControllerModel: AudioControllerModel
    initialMPSnippetModels: MPSnippetModel[]
    initialMPModel: MPModel
}

function MPWorkspace (props: MPWorkspaceProps): ReactJSXElement {
    const audioControllerModel = useRef(props.initialAudioControllerModel)
    const [snippetControllers, setSnippetControllers] = useState(props.initialMPSnippetModels)
    const mpModel = useRef(props.initialMPModel)
    const [isRecording, setIsRecording] = useState(false)
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
    const downloadStems = (): void => {
        setIsRecording(true)
        AudioControllerModelHelper.getInstance().startRecord().finally(() => { setIsRecording(false) })
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
                <Button onClick={onSubmit}> Submit Masterpiece</Button>
                <Button color={'warning'}> Abandon </Button>
                <Button onClick={downloadStems}> Download Stems </Button>
                {isRecording
                    ? <RecordingBackdrop isRecording={isRecording}/>
                    : null}
            </Box>
        </div>
    )
}
