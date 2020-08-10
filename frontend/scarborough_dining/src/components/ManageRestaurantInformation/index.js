import React, { Component } from 'react';
import FileUpload from '../FileUpload';
import Select from 'react-select';
import MENU_CATEGORIES from '../../enums/menu_categories';
import axios from 'axios';
import './styles.css'

const options = Object.keys(MENU_CATEGORIES).map(k => {
	return { value : k, label : MENU_CATEGORIES[k] }
});

const formStyle = {
    fontFamily: 'Didact Gothic, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    padding: '0% 30%'
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
    padding: '40px 0'
}

const descriptionStyle = {
    width: '100%'
}

function MenuItemForm(props) {

    return (
        <div style={containerStyle} name="menuItemForm">
            <h2 className='mt-4 font-weight-bold' style={{fontSize: '1.5em'}}>Item #{props.number}</h2>
            <input onChange={props.onNameChange} className='mt-4' style={inputStyle} name="name" type="text" placeholder="Name" required={true} value={props.name}/>
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Image</h2>
            <FileUpload acceptedFiles={'image/*'} onFileUpload={props.onImageChange} onFileDelete={props.onImageDelete}/>
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Price</h2>
            <input onChange={props.onPriceChange} className='mt-4' style={inputStyle} name="price" type="number" step="0.01" placeholder="Price" value={props.price} required={true} />
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Description</h2>
            <textarea onChange={props.onDescriptionChange} className='mt-4' style={descriptionStyle} placeholder='' value={props.description} name="description"/>  
            <h2 className='mt-4' style={{fontSize: '1.5em'}}>Dish Type</h2>
            <div className='w-100' style={{zIndex: 2}}>
                <Select onChange={props.onAddCuisineType} className='w-100 mt-4' isMulti options={options} value={props.cuisine}/>
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
            loggedIn: false,
            totalItems: 0,
            imageURLs: [],
            logo: undefined,
            restaurantName: undefined,
            description: '',
            profileDescription: '',
            video: undefined,
            ratings: [],
            menuItems: [],
            restaurantID: undefined,
            phoneNumber: undefined,
            address: undefined,
            city: undefined,
            province: undefined,
            postalCode: undefined,
            cuisineTypes: undefined
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        /* Request to see if user is logged in, if user is logged in
         * get user's googleId 
         */
        await axios.get('/auth/login/success')
          .then(results => this.setState({
              loggedIn: true,
              id: results.data.user.googleId
          })
        ).catch(err => this.setState({
                loggedIn: false
            })
        );
        
        // If there is a user logged in, then get user data from database
        if (this.state.loggedIn) {
            await axios.get(`/user/${this.state.id}`)
                .then(results => this.setState({
                    restaurantID: results.data.restaurantId,
                })
            );
            if (this.state.restaurantID) {
                await axios.get(`/restaurants/${this.state.restaurantID}`)
                    .then(results => this.setState({
                        restaurantName: results.data.name,
                        ratings: results.data.ratings,
                        imageURLs: results.data.imageURLs,
                        ratings: results.data.ratings,
                        logo: results.data.logoURL,
                        description: results.data.longDescription,
                        profileDescription: results.data.description,
                        video: results.data.introVideoURL,
                        phoneNumber: results.data.phoneNumber,
                        address: results.data.address,
                        city: results.data.city,
                        province: results.data.province,
                        postalCode: results.data.postalCode,
                        yearEstablished: results.data.yearEstablished,
                        cuisineTypes: results.data.cuisineTypes,
                        menuItems: results.data.menuItems,
                        restaurantVideoURL: results.data.introVideoURL,
                        totalItems: results.data.menuItems.length
                    }));
            }
        }
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value 
        })
    }
    
    addMenuItem = e => {
        e.preventDefault()
        let {totalItems, menuItems} = this.state;
        menuItems = menuItems.concat({
            name: '',
            restaurantID: this.state.restaurantID,      // TODO: change when log in works as expected
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

    onProfileDescriptionChange = e => {
        this.setState({
            profileDescription: e.target.value
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
            return axios.post('/media_upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                } 
            });
        });

        return Promise.all(responses)
            .then(responseArray => {
                return responseArray.map(response => response.data.result.secure_url || '');
            }).catch(e => e);
    }

    _retrieveImageURL = async logo => {
        const formData = new FormData();
        formData.append('file', logo);
        return axios.post('/media_upload/image', formData, {     // TODO: change to relative URL when that is set up properly
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url || ''
        ).catch(e => e);
    }

    _retrieveLogoImageURL = async logo => {
        const formData = new FormData();
        formData.append('file', logo);
        return axios.post('/media_upload/image', formData, {     // TODO: change to relative URL when that is set up properly
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url || ''
        ).catch(e => e);
    }

    _retrieveIntroVideoURL = async video => {
        const formData = new FormData();
        formData.append('file', video);
        return axios.post('/media_upload/video', formData, {     // TODO: change to relative URL when that is set up properly
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url || ''
        ).catch(e => e);
    }

    _postMenuItemData = async menuItems => {
        let responses = menuItems.map(menuItem => axios.post('/menu_items/add', menuItem));

        return Promise.all(responses)
            .then(responseArray => {
                return responseArray.map(response => response);
            })
            .catch(e => e);
    }

    onSubmit = async e => {
        e.preventDefault();
        
        let {menuItems, logo, video} = this.state;
        // TODO: add the logo image URL to the account once the login feature is
        // TODO: add the video URL to the account once login feature implemented
        let [logoImageURL, introVideoURL, menuImageURLs] = await Promise.all(
            [this._retrieveLogoImageURL(logo), this._retrieveIntroVideoURL(video), this._retrieveMenuImageURLs(menuItems)]
        );

        if (!(logoImageURL === "")) {
            this.setState({
                logo: logoImageURL
            })
        }

        for (let i = 0; i < menuImageURLs.length; i++) {
            if (menuImageURLs[i] === "") {
                menuImageURLs[i] = menuItems[i].imageURL
            }
        }
        
        let menuItemReqs = menuItems.map((menuItem, i) => {
            return {
                id: menuItem._id,
                name: menuItem.name,
                restaurantID: menuItem.restaurantID,
                price: menuItem.price,
                description: menuItem.description,
                imageURL: menuImageURLs[i],
                cuisineTypes: menuItem.cuisineTypes
            };
        });

       let restaurantInfo = {
           ownerID: this.state.id,
           ratings: this.state.ratings,
           name: this.state.restaurantName,
           logoURL: this.state.logo,
           imageURLs: this.state.imageURLs,
           phoneNumber: this.state.phoneNumber,
           address: this.state.address,
           city: this.state.city,
           province: this.state.province,
           postalCode: this.state.postalCode,
           cuisineTypes: this.state.cuisineTypes,
           description: this.state.profileDescription,
           longDescription: this.state.description,
           yearEstablished: this.state.yearEstablished,
           introVideoURL: this.state.restaurantVideoURL,
           menuItems: []
       }

       await axios.post(`/restaurants/update/${this.state.restaurantID}`, restaurantInfo)
       await axios.post(`/restaurants/addMenuItems/${this.state.restaurantID}`, {menuItems: menuItemReqs});
       window.location.reload(false)
    }

    render() {
        return (
            <div>
                <form style={formStyle} name="accountCreationForm" onSubmit={this.onSubmit}>
                    <div className='mb-4' style={containerStyle} name="accountInformation">
                        <h2 className='mb-4 font-weight-bold' style={{fontSize: '2em'}}>Restaurant Information</h2>
                        <input name="restaurantName" type="text" className="inputStyle" placeholder="Restaurant Name" required={true} value={this.state.restaurantName} onChange={this.handleChange}/>
                        <input name="phoneNumber" type="phone" className="inputStyle" placeholder="Restaurant Phone" required={true} value={this.state.phoneNumber} onChange={this.handleChange}/>
                        <input name="address" type="text" className="inputStyle" placeholder="Restaurant Address" required={true} value={this.state.address} onChange={this.handleChange}/>
                        <input name="city" type="text" className="inputStyle" placeholder="City" required={true} value={this.state.city} onChange={this.handleChange}/>
                        <input name="postalCode" type="text" className="inputStyle" placeholder="Postal Code" required={true} value={this.state.postalCode} onChange={this.handleChange}/>
                        <input name="province" type="text" className="inputStyle" placeholder="Province" required={true} value={this.state.province} onChange={this.handleChange}/>
                        <input name="yearEstablished" type="text" className="inputStyle" placeholder="Year Established (Optional)" required={false} value={this.state.yearEstablished} onChange={this.handleChange}/>
                        <h2 className='font-weight-bold' style={{fontSize: '1.5em'}}>Logo</h2>
                        <FileUpload acceptedFiles={'image/*'} onFileUpload={this.onLogoInputChange} onFileDelete={this.onLogoInputDelete} placeHolderValue={this.state.logo}/>
                        <h2 className='font-weight-bold mb-4 mt-4' style={{fontSize: '1.5em'}}>Restaurant Description</h2>
                        <textarea onChange={this.onRestaurantDescriptionChange} style={descriptionStyle} name="itemDescription" value={this.state.description}/>

                        <h2 className='font-weight-bold mb-4 mt-4' style={{fontSize: '1.5em'}}>Restaurant Profile Description</h2>
                        <textarea onChange={this.onProfileDescriptionChange} style={descriptionStyle} name="itemDescription" value={this.state.profileDescription}/>

                        <h2 className='font-weight-bold mb-4 mt-4' style={{fontSize: '1.5em'}}>Introductory Video</h2>
                        <FileUpload acceptedFiles={'video/*'} onFileUpload={this.onIntroVideoChange} onFileDelete={this.onIntroVideoDelete}/>
                        <input className="video mt-4" onChange={this.handleChange} name="restaurantVideoURL" placeholder="Intro Video YouTube URL" value={this.state.restaurantVideoURL} required={false}/>
                    </div>

                    {
                        
                        // TODO: find a way to update the state array
                        this.state.menuItems.map(
                            (k, i) => <MenuItemForm 
                                onAddCuisineType={e => this.onMenuCuisineChange(e, i)}
                                onImageChange={e => this.onMenuImageChange(e, i)}
                                onNameChange={e => this.onMenuNameChange(e, i)}
                                onPriceChange={e => this.onMenuPriceChange(e, i)}
                                onDescriptionChange={e => this.onMenuDescriptionChange(e, i)}
                                onImageDelete={e => this.onMenuImageDelete(e, i)}
                                key={i + 1}
                                number={i + 1}
                                name={k.name}
                                price={k.price}
                                description={k.description}
                                cuisine={k.cuisineTypes.map((cuisine, i) => {
                                    return {
                                        label: cuisine,
                                        value: cuisine
                                    }
                                })}
                                />
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