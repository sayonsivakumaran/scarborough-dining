import React, { Component } from 'react';

export default class FileUpload extends Component {
    render() {
        return (
                <form>
                    <div className='custom-file mb-4'>
                        <input type='file' className='custom-file-input' id='customFile'/>
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose file
                        </label>
                    </div>
                    <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4'/>
                </form>
        );
    }
}