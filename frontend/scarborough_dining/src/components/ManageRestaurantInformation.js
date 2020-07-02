import React, { Component } from 'react';
import FileUpload from './FileUpload';

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10% 30%'
}

const inputStyle = {
    padding: '0.25em',
    fontSize: '16px',
    width: '100%',
    margin: '0.5em 0px'
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0'
}

const descriptionStyle = {
    width: '100%'
}


function RestaurantInformationForm(props) {
    return (
        <div style={containerStyle} name="accountInformation">
            <h2 className='font-weight-bold' style={{fontSize: '2em'}}>Account Information</h2>
            <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Logo</h2>
            <FileUpload onUpload={props.onLogoInputChange}/>
            <div className='upload-file mb-4'>
                <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4'/>
            </div>
            <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Images & Videos</h2>
            <FileUpload/>
            <div className='upload-file mb-4'>
                <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4'/>
            </div>
            <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Restaurant Description</h2>
            <textarea style={descriptionStyle} name="itemDescription"/>    
        </div>
    )
}

function MenuItemForm(props) {
    return (
        <div style={containerStyle} name="menuItemForm">
            <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Item #{props.number}</h2>
            <input className='mt-4' style={inputStyle} name="dishName" type="text" placeholder="Name" required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Price</h2>
            <input className='mt-4' style={inputStyle} name="dishPrice" type="text" placeholder="Price" required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Description</h2>
            <textarea className='mt-4' style={descriptionStyle} placeholder="Description" name="itemDescription"/>  
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Dish Type</h2>
            <input className='mt-4' style={inputStyle} name="dishType" type="text" placeholder="Dish Type" required={true} />
            {/*
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Image</h2>
            <FileUpload />
            */}
        </div>
    )
}

export class ManageRestaurantInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItems: 0,
            logo: '',
            logoname: 'Choose File',
            uploadedLogo: {}
        }
    }

    createItemForms = e => {
        e.preventDefault()
        const {totalItems} = this.state;
        // console.log(process.env);
        this.setState({
            totalItems: totalItems + 1
        })
    }

    onLogoInputChange = e => {
        this.setState({
            logo: e.target.files[0],
            logoname: e.target.files[0].name
        })
        console.log(e);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log('eeeee');
        console.log(event.target[0].value);
        // console.log(event.target[1].value);
        // console.log(event.target[2].value);
        // console.log(event.target[3].value);
        // console.log(event.target[4].value);
    }

    render() {
        return (
            <div style={containerStyle}>
                <form style={formStyle} name="accountCreationForm" onSubmit={this.onSubmit}>
                    <div className='mb-4'>
                        <RestaurantInformationForm onLogoInputChange={this.onLogoInputChange}/>
                    </div>
                    {
                        [...Array(this.state.totalItems)].map((k, i) => <MenuItemForm number={i + 1}/>)
                    }
                    <input style={inputStyle} onClick={this.createItemForms} name="addMenuItem" type="submit" value="Add Menu Item"/>
                    <input style={inputStyle} name="submitRestaurantInformation" type="submit" value="Submit Information"/>
                </form>
            </div>
        )
    }
}

export default ManageRestaurantInformation;
