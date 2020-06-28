import React, { Component } from 'react';
import FileUpload from './FileUpload';

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10% 30%'
}

const inputStyle = {
    padding: '1em',
    fontSize: '20px',
    margin: '10px 0px'
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0'
}


function RestaurantInformationForm() {
    return (
        <div style={containerStyle} name="accountInformation">
            <h2 style={{fontSize: '2em'}}>Account Information</h2>
            <input style={inputStyle} name="logo" type="email" placeholder="Logo" required={true} />
            <input style={inputStyle} name="images" type="tel" placeholder="Images & Videos" required={true} />
            <input style={inputStyle} name="description" type="password" placeholder="Password" required={true} />
            <input style={inputStyle} name="submitRestaurantInformation" type="submit" value="Submit Information"/>
        </div>
    )
}


export class ManageRestaurantInformation extends Component {

    render() {
        return (
            <form style={formStyle} name="accountCreationForm">
                <RestaurantInformationForm />
                <FileUpload/>
            </form>
        )
    }
}

export default ManageRestaurantInformation;
