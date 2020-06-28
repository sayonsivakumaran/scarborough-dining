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


function RestaurantInformationForm() {
    return (
        <div style={containerStyle} name="accountInformation">
            {/* TODO: change the input types */}
            <h2 style={{fontSize: '2em'}}>Account Information</h2>
            <h2 style={{fontSize: '1.5em'}}>Logo</h2>
            <FileUpload/>
            <h2 style={{fontSize: '1.5em'}}>Images & Videos</h2>
            <FileUpload/>
            <h2 style={{fontSize: '1.5em'}}>Item Description</h2>
            <textarea style={descriptionStyle} name="itemDescription"/>    
        </div>
    )
}

function MenuItemForm(props) {
    return (
        <div style={containerStyle} name="menuItemForm">
            <h2 style={{fontSize: '1.5em'}}>Item #{props.number}</h2>
            <input style={inputStyle} name="dishName" type="text" placeholder="Name" required={true} />
            <input style={inputStyle} name="dishPrice" type="text" placeholder="Price" required={true} />
            <textarea style={descriptionStyle} placeholder="Description" name="itemDescription"/>  
            <input style={inputStyle} name="dishType" type="text" placeholder="Dish Type" required={true} />
        </div>
    )
}

export class ManageRestaurantInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItems: 0
        }
    }

    createItemForms = (e) => {
        e.preventDefault()
        const {totalItems} = this.state;
        this.setState({
            totalItems: totalItems + 1
        })
    }

    render() {
        return (
            <div style={containerStyle}>
                <form style={formStyle} name="accountCreationForm">
                    <div className='mb-4'>
                        <RestaurantInformationForm />
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
