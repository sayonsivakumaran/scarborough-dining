import React, { Component } from 'react';

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


export default class MenuItemForm extends Component {
    render() {
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
}