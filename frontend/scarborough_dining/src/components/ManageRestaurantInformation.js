import React, { Component } from 'react';
import FileUpload from './FileUpload';
import Select from 'react-select';
import MENU_CATEGORIES from '../enums/menu_categories';

const options = Object.keys(MENU_CATEGORIES).map(k => {
	return { value : k, label : MENU_CATEGORIES[k] }
});

console.log(options);

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

function MenuItemForm(props) {
    return (
        <div style={containerStyle} name="menuItemForm">
            <h2 className='mt-4 font-weight-bold' style={{fontSize: '1.5em'}}>Item #{props.number}</h2>
            <input onChange={props.onChange} className='mt-4' style={inputStyle} name="name" type="text" placeholder="Name" required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Price</h2>
            <input onChange={props.onChange} className='mt-4' style={inputStyle} name="price" type="text" placeholder="Price" required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Description</h2>
            <textarea onChange={props.onChange} className='mt-4' style={descriptionStyle} placeholder="Description" name="description"/>  
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Dish Type</h2>
            <div className='w-100' style={{zIndex: 2}}>
                <Select onChange={props.onAddCuisineType} className='w-100 mt-4' isMulti options={options} />
            </div>
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Image</h2>
            <FileUpload onFileUpload={props.onImageChange}/>
        </div>
    )
}

function DeleteItem(props) {
    if (props.totalItems > 0) {
        return (
            <div className='delete-item mb-4'>
                <input type='submit' onClick={props.onClick} value='Delete Item' className='bg-danger btn btn-primary btn-block mt-4'/>
            </div>
        );
    } else {
        return null;
    }
}

export class ManageRestaurantInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItems: 0,
            logo: {},
            description: '',
            menuItems: []
        }
    }

    addMenuItem = e => {
        e.preventDefault()
        let {totalItems, menuItems} = this.state;
        menuItems = menuItems.concat({
            name: '',
            restaurantID: 'RestaurantID1',      // TODO: change when log in works as expected
            price: 0, 
            image: {},
            description: '',
            cuisineTypes: []
        });
        this.setState({
            totalItems: totalItems + 1,
            menuItems: menuItems
        })
    }

    deleteMenuItem = e => {
        e.preventDefault();
        const {totalItems} = this.state;
        this.setState({
            totalItems: totalItems - 1
        });
    }

    onLogoInputChange = e => {
        e.preventDefault();
        this.setState({
            logo: e.target.files[0]
        });
    }

    onRestaurantDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    }

    onMenuItemChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i][e.target.name] = e.target.value;
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuCuisineChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i]['cuisineTypes'] = e.map(v => v.value);
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuImageChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i]['image'] = e.target.files[0];
        this.setState({
            menuItems: menuItems
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log('eeeee');
        console.log(this.state);
        // console.log(event.target[1].value);
        // console.log(event.target[2].value);
        // console.log(event.target[3].value);
        // console.log(event.target[4].value);
    }

    render() {
        return (
            <div>
                <form style={formStyle} name="accountCreationForm" onSubmit={this.onSubmit}>
                    <div className='mb-4' style={containerStyle} name="accountInformation">
                        <h2 className='font-weight-bold' style={{fontSize: '2em'}}>Account Information</h2>
                        <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Logo</h2>
                        <FileUpload onFileUpload={this.onLogoInputChange}/>
                        <h2 className='font-weight-bold mt-4' style={{fontSize: '1.5em'}}>Restaurant Description</h2>
                        <textarea onChange={this.onRestaurantDescriptionChange} style={descriptionStyle} name="itemDescription"/>    
                    </div>
                    {
                        // TODO: find a way to update the state array
                        [...Array(this.state.totalItems)].map(
                            (k, i) => <MenuItemForm 
                                onAddCuisineType={e => this.onMenuCuisineChange(e, i)}
                                onImageChange={e => this.onMenuImageChange(e, i)}
                                onChange={e => this.onMenuItemChange(e, i)}
                                key={i + 1}
                                number={i + 1}/>
                        )
                    }
                    <DeleteItem totalItems={this.state.totalItems} onClick={this.deleteMenuItem}/>
                    <input style={inputStyle} onClick={this.addMenuItem} name="addMenuItem" type="submit" value="Add Menu Item"/>
                    <input style={inputStyle} name="submitRestaurantInformation" type="submit" value="Submit Information"/>
                </form>
                
            </div>
        )
    }
}

export default ManageRestaurantInformation;
