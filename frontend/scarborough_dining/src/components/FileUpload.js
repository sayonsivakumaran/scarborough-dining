import React, { Component } from 'react';
import axios from 'axios';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            filename: 'Choose File',
            uploadedFile: {}
        }
    }

    onFileInputChange = e => {
        this.setState({
            file: e.target.files[0],
            filename: e.target.files[0].name
        })
    }

    onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', this.state.file);
        
        try {
            const res = await axios.post('http://localhost:5000/media_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                } 
            });

            const { secure_url } = res.data.result;
            console.log(secure_url);
        } catch (err) {
            if (err.response.status === 500) {
                console.error('Problem found in the server');
            } 
        }
    }

    render() {
        return (
                <div className='custom-file mt-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={this.props.onUpload}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                        {this.state.filename}
                    </label>
                </div>
        );
    }
}