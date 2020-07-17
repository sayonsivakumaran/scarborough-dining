import React, { Component } from 'react'
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login'

// Google Client ID
const CLIENT_ID = '656946100283-d2di4a9k3r7tmln8uvanstuovoh6qmsu.apps.googleusercontent.com'

/**
 * Class: GoogleBtn
 * GoogleBtn component that can be used to sign-in/out of 
 * existing google account
 */
export class GoogleBtn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            isLogined: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login (response) {
        axios.post('/customers/login', {
            email: response.profileObj.email
        }).then(res => {
            this.setState({
                id: res.data.customer._id,
                isLogined: true,
                accessToken: response.accessToken
            })
            this.props.login(this.state);
        }).catch(err => {
            console.log(err);
        })
    }
    
    logout (response) {
        this.setState(state => ({
          id: '',
          isLogined: false,
          accessToken: ''
        }));
        this.props.logout(this.state)
    }
    
    handleLoginFailure (response) {
        //alert('Failed to log in')
    }
    
    handleLogoutFailure (response) {
        //alert('Failed to log out')
    }

    render() {
        return (
            <div className="google-btn">
                { this.state.isLogined ?
                <GoogleLogout
                    clientId={ CLIENT_ID }
                    render={renderProps => (
                        <p id="logout-p" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log Out</p>
                    )}
                    buttonText='Log-Out'
                    onLogoutSuccess={ this.logout }
                    onFailure={ this.handleLogoutFailure }
                >
                </GoogleLogout>: <GoogleLogin
                    clientId={ CLIENT_ID }
                    render={renderProps => (
                        <p id="login-p" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log In</p>
                    )}
                    buttonText='Log-In'
                    onSuccess={ this.login }
                    onFailure={ this.handleLoginFailure }
                    cookiePolicy={ 'single_host_origin' }
                    responseType='code,token'
                    isSignedIn={true}
                />
                }
            </div>
        )
    }
}

export default GoogleBtn
