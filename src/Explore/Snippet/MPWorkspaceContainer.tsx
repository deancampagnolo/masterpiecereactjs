import * as React from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import MPSnippetContainer from './MPSnippetContainer'
import { useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import MPSnippetModel from './MPSnippetModel'
import MPWorkspaceContainerModel from './MPWorkspaceContainerModel'
import { FetchAndConnectMPAudio, FetchPreviewMP, PostMP } from '../../RestOperations/MPRestOperations'
import AudioControllerModel, { AudioControllerModelHelper } from '../../Utils/AudioControllerModel'
import MPTitle from './MPTitle'
import MPModel from './MPModel'
import MPMetaData from './MPMetaData'
import Typography from '@mui/material/Typography'
import RecordingBackdrop from './RecordingBackdrop'
import Preview from './Preview'
import { createZipFromKeyedBlob } from '../../Utils/ZipHelper'

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
        FetchPreviewMP(songId).then((newModel) => {
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
    const [isPreviewing, setIsPreviewing] = useState(true)
    const addSnippetController = (selectedFiles: string[]): void => {
        audioControllerModel.current.pauseMaster()
        const mpSnippetModels = [] as MPSnippetModel[]
        selectedFiles.forEach((file) => {
            const mpSnippetModel = new MPSnippetModel(file, null)
            audioControllerModel.current.addAudio(mpSnippetModel.audioLocalUUID, file)
            mpSnippetModels.push(mpSnippetModel)
        })

        setSnippetControllers([...snippetControllers, ...mpSnippetModels])
    }

    const onRemove = (id: number): void => {
        audioControllerModel.current.removeAudio(id)
        setSnippetControllers(snippetControllers.filter((sc) => sc.audioLocalUUID !== id))
    }

    const onSubmit = async (): Promise<void> => {
        setIsRecording(true)
        let masterRenderedFile: Blob | null = null
        await AudioControllerModelHelper.getInstance().startDownloadRecord(true)
            .then((res) => {
                masterRenderedFile = res[0].blob
            }).finally(() => { setIsRecording(false) })
        if (masterRenderedFile != null) {
            await PostMP(audioControllerModel.current.getAllUrl(), snippetControllers, mpModel.current, masterRenderedFile)
        } else {
            console.error('master rendered file did not get created')
            // TODO send something to user.
        }
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
    const downloadStems = (mpSnippetModels: MPSnippetModel[], title: string): void => {
        setIsRecording(true)
        AudioControllerModelHelper.getInstance().startDownloadRecord(false)
            .then((res) => {
                createZipFromKeyedBlob(res, mpSnippetModels, title)
            }).finally(() => { setIsRecording(false) })
    }

    const fetchMPAudio = (): void => {
        void FetchAndConnectMPAudio(snippetControllers).then(() => { setIsPreviewing(false) })
    }

    return (
        <div style={{ width: '35%', position: 'relative' }}>
            <MPTitle onTitleChange={onTitleChange} defaultTitle={mpModel.current.title}/>
            <MPMetaData style={{ marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vh' }}
                defaultBpm={mpModel.current.bpm} onBPMChange={onBPMChange} defaultKey={mpModel.current.key} onKeyChange={onKeyChange}
                defaultNeeds={mpModel.current.neededInstruments} onNeedsChange={onNeedsChange}/>
            <div style={{ position: 'relative' }}>
                <MPSnippetContainer onRemove={onRemove} onAdd={addSnippetController} snippetControllers={snippetControllers}
                    onSnippetTitleChange={onSnippetTitleChange} isPreview={isPreviewing}/>
                {isPreviewing ? <Preview isPreviewing={isPreviewing}/> : null}
            </div>
            <Box display="flex" flexDirection="row" sx={{ justifyContent: 'center' }}>
                <Button onClick={() => { void onSubmit() }}> Submit Masterpiece</Button>
                <Button color={'warning'}> Abandon </Button>
                <Button onClick={() => { downloadStems(snippetControllers, mpModel.current.title) }}> Download Stems </Button>
                {isPreviewing ? <Button onClick={fetchMPAudio}> Fetch MP Audio </Button> : null}

                {isRecording
                    ? <RecordingBackdrop isRecording={isRecording}/>
                    : null}
            </Box>
        </div>
    )
}
