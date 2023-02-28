import { KeyedBlob } from './KeyedBlob'
import { getExt } from './ExtensionHelper'
import fileDownload from 'js-file-download'
import JSZip from 'jszip'
import MPSnippetModel from '../Explore/Snippet/MPSnippetModel'

export const createZipFromKeyedBlob = (keyedBlobs: KeyedBlob[], mpSnippetModels: MPSnippetModel[], title: string): void => {
    const zip = new JSZip()
    keyedBlobs.forEach((value) => {
        let name = ''
        if (value.key === 0) {
            name = 'master'
        } else {
            const target = mpSnippetModels.find((mpsm) => {
                return mpsm.audioLocalUUID.toString() === value.key.toString()
            })
            if (target != null) {
                name = target.name
            } else {
                console.error('target is null')
                name = 'undefined'
            }
        }
        zip.file(name + getExt(value.blob.type), value.blob)
    })
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        fileDownload(content, title + '_stems.zip')
    }).catch(console.error)
}
