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
            {/* TODO: change the input types */}
            <h2 style={{fontSize: '2em'}}>Account Information</h2>
            <input style={inputStyle} name="logo" type="email" placeholder="Logo" required={true} />
            <input style={inputStyle} name="images" type="tel" placeholder="Images & Videos" required={true} />
            <input style={inputStyle} name="description" type="password" placeholder="Password" required={true} />
        </div>
    )
}

function MenuItemForm() {
    return (
        <div style={containerStyle} name="menuItemForm">
            <h2 style={{fontSize: '1.5em'}}>Add Item</h2>
            <input style={inputStyle} name="dishName" type="text" placeholder="Name" required={true} />
            <input style={inputStyle} name="dishPrice" type="text" placeholder="Price" required={true} />
            <input style={inputStyle} name="dishDescription" type="text" placeholder="Description" required={true} />
            <input style={inputStyle} name="dishTypes" type="text" placeholder="Dish Types" required={true} />
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

    createItemForms = () => {
        const {totalItems} = this.state;
        this.setState({
            totalItems: totalItems + 1
        })
    }

    render() {
        return (
            <div style={containerStyle}>
                <form style={formStyle} name="accountCreationForm">
                    <RestaurantInformationForm />
                    <FileUpload/>
                    {
                        [...Array(this.state.totalItems)].map(() => <MenuItemForm />)
                    }
                    <input style={inputStyle} onClick={this.createItemForms} name="submitRestaurantInformation" type="submit" value="Submit Information"/>
                </form>
            </div>
        )
    }
}

export default ManageRestaurantInformation;
