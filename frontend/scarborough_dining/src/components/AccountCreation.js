import React, { Component } from 'react'

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10% 30%'
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0'
}

const inputStyle = {
    padding: '1em',
    fontSize: '20px',
    margin: '10px 0px'
}

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
            <div style={containerStyle}>
                <h2 style={{fontSize: '2em'}}>Account Information</h2>
                <input 
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="phoneNumber"
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Phone Number"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    required={true}
                    style={inputStyle}
                    onChange={this.passwordValidate}
                />
                <p style={{color: 'red', visibility: `${this.state.passwordMatch}`}}>Passwords Do Not Match</p>
            </div>
        )
    }

    RestaurantForm = () => {
        return (
            <div style={containerStyle}>
                <h2 style={{fontSize: '2em'}}>Restaurant Information</h2>
                <input 
                    name="restaurantName"
                    type="text"
                    placeholder="Restaurant Name"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantPhone"
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Restaurant Phone"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantAddress"
                    type="text"
                    placeholder="Restaurant Address"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
                <input 
                    name="restaurantCuisine"
                    type="text"
                    placeholder="Restaurant Cuisine"
                    required={true}
                    style={inputStyle}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    render() {
        if (this.props.userType === "user") {
            return (
                <form style={formStyle} onSubmit={this.handleSubmit}>
                    <this.UserForm />
                    <div style={containerStyle}>
                        <input
                            name="submit"
                            type="submit"
                            value="Create Account"
                            style={inputStyle}
                        />
                    </div>
                </form>
            )
        } else {
            return (
                <form style={formStyle} onSubmit={this.handleSubmit}>
                    <this.UserForm />
                    <this.RestaurantForm />
                    <div style={containerStyle}>
                        <input
                            name="submit"
                            type="submit"
                            value="Register Restaurant"
                            style={inputStyle}
                        />
                    </div>
                </form>
            )
        }
    }
}

/*
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

function UserForm() {
    return (
        <div style={containerStyle} name="accountInformation">
            <h2 style={{fontSize: '2em'}}>Account Information</h2>
            <input style={inputStyle} name="fullName" type="text" placeholder="Full Name" required={true} />
            <input style={inputStyle} name="email" type="email" placeholder="Email" required={true} />
            <input style={inputStyle} name="phoneNumber" type="tel" placeholder="Phone Number" required={true} />
            <input style={inputStyle} name="password" type="password" placeholder="Password" required={true} />
            <input style={inputStyle} name="confirmPassword" type="password" placeholder="Confirm Password" required={true} />
        </div>
    )
}

function RestaurantForm() {
    return (
        <div style={containerStyle} name="restaurantInformation">
            <h2 style={{fontSize: '2em'}}>Restaurant Information</h2>
            <input style={inputStyle} name="restaurantName" type="text" placeholder="Business Name" required={true} />
            <input style={inputStyle} name="restaurantPhone" type="tel" placeholder="Business Number" required={true} />
            <input style={inputStyle} name="restaurantLocation" type="text" placeholder="Business Address" required={true} />
            <input style={inputStyle} name="restaurantCuisine" type="text" placeholder="Type of Food" required={true} />
        </div>
    )
}


var i = 1;

//Renders the customer vs restaurant account creation form depending on which link user clicks
export class AccountCreation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Hello " + (i + 1));
    }

    UserForm() {
        return (
            <div>

            </div>
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="hello"/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
    /*

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {

    }


    render() {
        if (this.props.userType === "restaurant") {
            return (
                <form style={formStyle} name="accountCreationForm" >
                    <UserForm />
                    <RestaurantForm />
                    <div style={{padding: '0 10%'}}>
                        <input style={inputStyle} name="createAccount" type="submit" value="Register Restaurant"/>
                    </div>
                </form>
            )
        }
        else {
            return (
                <form style={formStyle} name="accountCreationForm">
                    <UserForm />
                    <div style={{padding: '0 10%'}}>
                        <input style={inputStyle} name="createAccount" type="submit" value="Create Account" />
                    </div>
                </form>
            )
        }
    }
}*/

export default AccountCreation;
