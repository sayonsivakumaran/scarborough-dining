import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './style.css';

export class LogIn extends Component {

    render() {

        let BACK_END_URL = ''
        if (process.env.NODE_ENV === "production") {
            BACK_END_URL = "/" 
        } else { 
            BACK_END_URL = "http://localhost:5000" 
        }

        return (
            <div className="background">
                <div className="Log-In">
                    <h1>Log In</h1>
                        <div className="text-content">
                            <p>Please use one of the sign-in options below to log into your account.</p>
                            <p>Don't have an account? <Link to='/register'>Register</Link> for an account.</p>
                        </div>
                    <div className="login-options">
                        <h3>Log In Options</h3>
                        <div className="options">
                            <a class="google" href={BACK_END_URL+'/auth/login/google'}>Google Login</a>
                        </div>
                        {this.props.fail && (
                            <div className="fail">
                                <p>This account does not exist.</p>
                                <p>Please <Link to='/register'>register</Link> for an account.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default LogIn
