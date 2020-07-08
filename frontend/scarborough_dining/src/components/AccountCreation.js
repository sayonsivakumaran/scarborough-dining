import React, { Component } from 'react'
import './style/AccountCreation.css';

export class AccountCreation extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            //Account Information
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordMatch: 'hidden',
            //Restaurant Information
            restaurantName: '',
            restaruantPhone: '',
            restaurantAddress: '',
            restaurantCuisine: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordValidate = this.passwordValidate.bind(this);
    }

    //Handles when fields in the input are changed
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value 
        })
    }

    //Handle when the "submit" button on the form is pressed
    handleSubmit(event) {
        
    }

    passwordValidate(event) {
        const confirmPassword = event.target.value;
        if (this.state.password === confirmPassword) {
            this.setState({
                passwordMatch: 'hidden'
            })
        }
        else {
            this.setState({
                passwordMatch: 'visible'
            })
        }
    }

    UserForm = () => {
        return (
            <div className="containerStyle">
                <h2 className="title mb-4 font-weight-bold">Account Information</h2>
                <input 
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="phoneNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Phone Number"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
                <input 
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    required={true}
                    className="inputStyle"
                    onChange={this.passwordValidate}
                />
                <p style={{color: 'red', visibility: `${this.state.passwordMatch}`}}>Passwords Do Not Match</p>
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
                    name="restaurantCuisine"
                    type="text"
                    placeholder="Restaurant Cuisine"
                    required={true}
                    className="inputStyle"
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    render() {
        if (this.props.userType === "user") {
            return (
                <form className="formStyle" onSubmit={this.handleSubmit}>
                    <this.UserForm />
                    <div className="containerStyle">
                        <input
                            name="submit"
                            type="submit"
                            value="Create Account"
                            className="inputStyle"
                        />
                    </div>
                </form>
            )
        } else {
            return (
                <form className="formStyle" onSubmit={this.handleSubmit}>
                    <div className="formContainer">
                        <this.UserForm />
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
