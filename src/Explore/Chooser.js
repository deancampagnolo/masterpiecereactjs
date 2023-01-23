import React, { Component } from 'react'
import { PostS3File } from '../RestOperations/S3RestOperations'

class App extends Component {
    state = {
        selectedFile: null
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    onFileUpload = () => {
        const formData = new FormData()

        formData.append(
            'file',
            this.state.selectedFile
        )

        const files = [this.state.selectedFile]

        PostS3File(files[0])
        // PostMasterpiece(new MasterpieceContribution(4, 'aba', this.state.selectedFile))
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <h4>choose file :)</h4>
                </div>
            )
        }
    }

    render () {
        return (
            <div>
                <h1>
                    Upload File
                </h1>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload
                    </button>
                </div>
                {this.fileData()}
            </div>
        )
    }
}

export default App
