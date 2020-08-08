import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Redirect } from 'react-router'
import FileUpload from '../FileUpload';
import MENU_CATEGORIES from '../../enums/menu_categories';
import './styles.css';

const options = Object.keys(MENU_CATEGORIES).map(k => {
	return { value : k, label : MENU_CATEGORIES[k] }
});

export class AccountCreation extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            redirect: false,
            loggedIn: false,
            id: '',
            //Account Information
            firstName: '',
            lastName: '',
            address: '',	
            city: '',	
            postalCode: '',	
            province: '',	
            //Restaurant Information
            restaurantName: '',
            restaurantPhone: '',
            restaurantAddress: '',
            restaurantCuisine: [],
            restaurantCity: '',
            restaurantPostalCode: '',
            restaurantProvince: '',
            restaurantLogo: undefined,
            restaurantProfileImage: undefined,
            restaurantDescription : '',
            restaurantProfileDescription: '',
            restaurantVideoURL: '',
            yearEstablished: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * @description     On loading of this component, send a back-end request for currently
     *                  logged in user's data so that it can be modified
     */
    async componentDidMount() {

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
                    firstName: results.data.firstName,
                    lastName: results.data.lastName,
                    address: results.data.address,	
                    city: results.data.city,	
                    postalCode: results.data.postalCode,	
                    province: results.data.province
                })
            );
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    /**
     * Handles change for restaurant logo file
     * @param {*} e 
     */
    handleLogoFileChange = e => {
        e.preventDefault();
        console.log(e.target.files[0]);
        this.setState({
            restaurantLogo: e.target.files[0] || undefined
        });
    }

    /**
     * Handles delete for restaurant logo file
     * @param {Object} event the event to be deleted
     */
    handleLogoFileDelete = e => {
        e.preventDefault();
        this.setState({
            restaurantLogo: undefined
        });
    }

    /**
     * Handles change for restaurant profile file
     * @param {Object} event the event to be deleted
     */
    handleProfileFileChange = e => {
        e.preventDefault();
        this.setState({
            restaurantProfileImage: e.target.files[0] || undefined
        });
    }

    /**
     * Handles delete for restaurant profile file
     * @param {Object} event the event to be deleted
     */
    handleProfileFileDelete = e => {
        e.preventDefault();
        this.setState({
            restaurantProfileImage: undefined
        });
    }

    onCuisineTypesChange = e => {
        let cuisineTypes = e ? e.map(v => v.value) : [];
        this.setState({
            restaurantCuisine : cuisineTypes
        })
    }

    //Handles when fields in the input are changed
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value 
        })
    }

    /**
     * Makes file upload request and returns the cloudinary url
     * @param {*} image to be uploaded
     */ 
    _uploadImageURL = async image => {
        const formData = new FormData();
        formData.append('file', image);
        return axios.post('/media_upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url || ''
        ).catch(e => e);
    }

    //Handle when the "submit" button on the form is pressed
    async handleSubmit(event) {
        event.preventDefault();
        let info = '';
        if (this.props.userType === "user") {	
            info = 	
            {	
                firstName: this.state.firstName,	
                lastName: this.state.lastName,		
                address: this.state.address,	
                city: this.state.city,	
                postalCode: this.state.postalCode,	
                province: this.state.province,	
                favouriteRestaurantIDs: ["-1"],	
                ratings: [],	
            }	
            axios.post(`/user/update/${this.state.id}`, info)	
                .then(console.log("Success!"))	
                .catch((error) => {	
                    console.log(error);	
                    alert("This email address is already in use");	
                });

            alert("Account Information has been updated");
            this.setState({ redirect: true });

        } else {
            const restaurantLogoURL = await (this._uploadImageURL(this.state.restaurantLogo));
            const restaurantProfileImageURL = await (this._uploadImageURL(this.state.restaurantProfileImage));

            let restaurantInfo = {
                ownerID: this.state.id,
                ratings: [],
                name: this.state.restaurantName,
                logoURL: restaurantLogoURL,
                imageURLs: restaurantProfileImageURL,
                phoneNumber: this.state.restaurantPhone,
                address: this.state.restaurantAddress,
                city: this.state.restaurantCity,
                province: this.state.restaurantProvince,
                postalCode: this.state.restaurantPostalCode,
                cuisineTypes: this.state.restaurantCuisine,
                menuItemIDs: [],
                description: this.state.restaurantDescription,
                longDescription: this.state.restaurantProfileDescription,
                yearEstablished: this.state.yearEstablished,
                introVideoURL: this.state.restaurantVideoURL
            }

            await axios.post('/restaurants/add', restaurantInfo)
            .then(
                console.log("Added the restaurant"),
                alert("User and Restaurant has been created!"))    
            .catch((error) => {
                console.log(error);
                alert("Error with registration: " + error);
            });
            let ownerdata = ''
            await axios.get(`restaurants/owner/${this.state.id}`)
            .then(res => {
                ownerdata = res.data;
            })

            await axios.post(`/user/add-restaurant/${this.state.id}`, {restaurantId: ownerdata})
        }
        // When submit has completed, then reload so changes reflect in front-end
        window.location.reload(false)
    }

    UserForm = () => {
        return (
            <div className="containerStyle">
                <h2 className="mb-4 font-weight-bold">Account Information</h2>
                <input 
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    placeholder="First Name"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    placeholder="Last Name"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 	
                    name="address"	
                    type="text"
                    value={this.state.address}
                    placeholder="Address"	
                    required={true}	
                    className="inputStyle"	
                    onChange={this.handleChange}	
                />	
                <input 	
                    name="city"	
                    type="text"	
                    value={this.state.city}
                    placeholder="City"	
                    required={true}	
                    className="inputStyle"	
                    onChange={this.handleChange}	
                />	
                <input 	
                    name="postalCode"	
                    type="text"	
                    value={this.state.postalCode}
                    placeholder="Postal Code"	
                    required={true}	
                    className="inputStyle"	
                    onChange={this.handleChange}	
                />	
                <input 	
                    name="province"	
                    type="text"	
                    value={this.state.province}
                    placeholder="Province"	
                    required={true}	
                    className="inputStyle"	
                    onChange={this.handleChange}	
                />
            </div>
        )
    }

    RestaurantForm = () => {
        return (
            <div className="containerStyle">
                <h2 className="title mb-4 font-weight-bold">Restaurant Information</h2>
                <input 
                    name="restaurantName"
                    type="text"
                    placeholder="Restaurant Name"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantPhone"
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Restaurant Phone"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantAddress"
                    type="text"
                    placeholder="Restaurant Address"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantCity"
                    type="text"
                    placeholder="City"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantPostalCode"
                    type="text"
                    placeholder="Postal Code"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantProvince"
                    type="text"
                    placeholder="Province"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <label>Optional Year Established (Displayed as : Since 2000)</label>
                    <input 
                        label="Since"
                        name="yearEstablished"
                        pattern="[0-9]{4}"
                        type="text"
                        placeholder="2000"
                        required={false}
                        className="inputStyle"
                        onChange={this.handleChange}
                    />
                <h2 className='mt-4' style={{fontSize: '1.5em'}}>Restaurant Type</h2>
                <div className="fileUpload">
                    <Select onChange={this.onCuisineTypesChange} className='w-100 mt-4' isMulti options={options} />
                </div>
                <h2 className='mt-4' style={{fontSize: '1.5em'}}>Logo</h2>
                <div className="fileUpload">
                    <FileUpload name="restaurantLogo" acceptedFiles={'image/*'} onFileUpload={this.handleLogoFileChange} onFileDelete={this.handleLogoFileDelete}/>
                </div>
                <h2 className='mt-4' style={{fontSize: '1.5em'}}>Profile Introduction Image</h2>
                <div className="fileUpload">
                    <FileUpload name="restaurantProfileImage" acceptedFiles={'image/*'} onFileUpload={this.handleProfileFileChange} onFileDelete={this.handleProfileFileDelete}/>
                </div>
                <h2 className='mt-4' style={{fontSize: '1.5em'}}>Restaurant Profile Description</h2>
                <textarea className="inputDescription mt-4" onChange={this.handleChange} name="restaurantProfileDescription" required={true}/>
                <h2 className='mt-4' style={{fontSize: '1.5em'}}>Restaurant Description (Shown in card)</h2>
                <textarea className="small-inputDescription mt-4" onChange={this.handleChange} name="restaurantDescription" required={true}/>
                <h2 className='mt-4' style={{fontSize: '1.5em'}}>Restaurant Introduction Video (Youtube) URL</h2>
                <textarea className="video mt-4" onChange={this.handleChange} name="restaurantVideoURL" required={false}/>
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }
        if (this.props.userType === "user") {
            window.scrollTo(0, 0);
            return (
                <form className="formStyle" onSubmit={this.handleSubmit}>
                    <this.UserForm />
                    <div className="containerStyle">
                        <input
                            name="submit"
                            type="submit"
                            value="Update Account Information"
                            className="inputStyle"
                        />
                    </div>
                </form>
            )
        } else {
            window.scrollTo(0, 0);
            return (
                <form className="formStyle" onSubmit={this.handleSubmit}>
                    <div className="formContainer">
                        <this.RestaurantForm />
                    </div>

                    <div className="containerStyle">
                        <input
                            name="submit"
                            type="submit"
                            value="Register Restaurant"
                            className="inputStyle"
                        />
                    </div>
                </form>
            )
        }
    }
} export default AccountCreation
