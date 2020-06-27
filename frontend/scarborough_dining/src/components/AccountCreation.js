import React, { Component } from 'react'

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

//Renders the customer vs restaurant account creation form depending on which link user clicks
export class AccountCreation extends Component {

    render() {
        if (this.props.userType === "restaurant") {
            return (
                <form style={formStyle} name="accountCreationForm">
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
                        <input style={inputStyle} name="createAccount" type="submit" value="Create Account"/>
                    </div>
                </form>
            )
        }
    }
}

export default AccountCreation
