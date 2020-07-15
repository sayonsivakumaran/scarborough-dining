import React, { Component } from 'react';
import FileUpload from './FileUpload';
import Select from 'react-select';
import MENU_CATEGORIES from '../enums/menu_categories';
import axios from 'axios';

const options = Object.keys(MENU_CATEGORIES).map(k => {
	return { value : k, label : MENU_CATEGORIES[k] }
});

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
            <input onChange={props.onNameChange} className='mt-4' style={inputStyle} name="name" type="text" placeholder="Name" required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Image</h2>
            <FileUpload acceptedFiles={'image/*'} onFileUpload={props.onImageChange} onFileDelete={props.onImageDelete}/>
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Price</h2>
            <input onChange={props.onPriceChange} className='mt-4' style={inputStyle} name="price" type="number" step="0.01" placeholder="Price" required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Description</h2>
            <textarea onChange={props.onDescriptionChange} className='mt-4' style={descriptionStyle} placeholder='' name="description"/>  
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Dish Type</h2>
            <div className='w-100' style={{zIndex: 2}}>
                <Select onChange={props.onAddCuisineType} className='w-100 mt-4' isMulti options={options} />
            </div>
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
            logo: undefined,
            description: '',
            video: undefined,
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
            image: undefined,
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
        let {totalItems, menuItems} = this.state;
        menuItems.pop()
        this.setState({
            totalItems: totalItems - 1,
            menuItems: menuItems
        });
    }

    onLogoInputChange = e => {
        e.preventDefault();
        this.setState({
            logo: e.target.files[0] || undefined
        });
    }

    onLogoInputDelete = e => {
        e.preventDefault();
        this.setState({
            logo: undefined
        });
    }

    onRestaurantDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    }

    onIntroVideoChange = e => {
        e.preventDefault();
        this.setState({
            video: e.target.files[0] || undefined
        });
    }

    onIntroVideoDelete = e => {
        e.preventDefault();
        this.setState({
            video: undefined
        });
    }


    onMenuNameChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i].name = e.target.value;
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuPriceChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i].price = parseFloat(e.target.value);
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuDescriptionChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i].description = e.target.value;
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuCuisineChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i].cuisineTypes = e ? e.map(v => v.value) : [];
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuImageChange = (e, i) => {
        let {menuItems} = this.state;
        menuItems[i].image = e.target.files[0] || undefined;
        this.setState({
            menuItems: menuItems
        });
    }

    onMenuImageDelete = (e, i) => {
        e.preventDefault();
        let {menuItems} = this.state;
        menuItems[i].image = undefined;
        this.setState({
            menuItems: menuItems
        });
    }

    _retrieveMenuImageURLs = async menuItems => {
        let responses = menuItems.map(menuItem => {
            const formData = new FormData();
            formData.append('file', menuItem.image);
            return axios.post('http://localhost:5000/media_upload/image', formData, {    // TODO: change to relative URL when that is set up properly
                headers: {
                    'Content-Type': 'multipart/form-data'
                } 
            });
        });

        return Promise.all(responses).then(responseArray => {
            return responseArray.map(response => response.data.result.secure_url || '');
        });
    }

    _retrieveLogoImageURL = async logo => {
        const formData = new FormData();
        formData.append('file', logo);
        return axios.post('http://localhost:5000/media_upload/image', formData, {     // TODO: change to relative URL when that is set up properly
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url || ''
        );
    }

    _retrieveIntroVideoURL = async video => {
        const formData = new FormData();
        formData.append('file', video);
        return axios.post('http://localhost:5000/media_upload/video', formData, {     // TODO: change to relative URL when that is set up properly
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url || ''
        );
    }

    _postMenuItemData = async menuItems => {
        let responses = menuItems.map(menuItem => axios.post('http://localhost:5000/menu_items/add', menuItem));

        return Promise.all(responses).then(responseArray => {
            return responseArray.map(response => response);
        });
    }

    onSubmit = async e => {
        e.preventDefault();
        let {menuItems, logo, video} = this.state;
        // TODO: add the logo image URL to the account once the login feature is
        // TODO: add the video URL to the account once login feature implemented
        let [logoImageURL, introVideoURL, menuImageURLs] = await Promise.all(
            [this._retrieveLogoImageURL(logo), this._retrieveIntroVideoURL(video), this._retrieveMenuImageURLs(menuItems)]
        );
        
        let menuItemReqs = menuItems.map((menuItem, i) => {
            return {
                name: menuItem.name,
                restaurantID: menuItem.restaurantID,
                price: menuItem.price,
                description: menuItem.description,
                imageURL: menuImageURLs[i],
                cuisineTypes: menuItem.cuisineTypes
            };
        });

        // TODO: use the response to get the menu item IDs and associate them with the restaurant owners
        let response = await this._postMenuItemData(menuItemReqs);
    }

    render() {
        return (
            <div>
                <form style={formStyle} name="accountCreationForm" onSubmit={this.onSubmit}>
                    <div className='mb-4' style={containerStyle} name="accountInformation">
                        <h2 className='mb-4 font-weight-bold' style={{fontSize: '2em'}}>Account Information</h2>
                        <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Logo</h2>
                        <FileUpload acceptedFiles={'image/*'} onFileUpload={this.onLogoInputChange} onFileDelete={this.onLogoInputDelete}/>
                        <h2 className='font-weight-bold mb-4 mt-4' style={{fontSize: '1.5em'}}>Restaurant Description</h2>
                        <textarea onChange={this.onRestaurantDescriptionChange} style={descriptionStyle} name="itemDescription"/>

                        <h2 className='font-weight-bold mb-4 mt-4' style={{fontSize: '1.5em'}}>Introductory Video</h2>
                        <FileUpload acceptedFiles={'video/*'} onFileUpload={this.onIntroVideoChange} onFileDelete={this.onIntroVideoDelete}/>
                    </div>
                    {
                        // TODO: find a way to update the state array
                        [...Array(this.state.totalItems)].map(
                            (k, i) => <MenuItemForm 
                                onAddCuisineType={e => this.onMenuCuisineChange(e, i)}
                                onImageChange={e => this.onMenuImageChange(e, i)}
                                onNameChange={e => this.onMenuNameChange(e, i)}
                                onPriceChange={e => this.onMenuPriceChange(e, i)}
                                onDescriptionChange={e => this.onMenuDescriptionChange(e, i)}
                                onImageDelete={e => this.onMenuImageDelete(e, i)}
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
