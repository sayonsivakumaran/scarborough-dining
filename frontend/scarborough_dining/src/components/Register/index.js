import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './style.css'

export class Register extends Component {
    render() {

        let BACK_END_URL = ''
        if (process.env.NODE_ENV === "production") {
            BACK_END_URL = "/" 
        } else { 
            BACK_END_URL = "http://localhost:5000" 
        }

        return (
            <div className="background">
            <div className="register">
                <h1>Register</h1>
                    <div className="text-content">
                        <p>Please use one of the sign-in options below to create an account.</p>
                        <p>Don't have an account? <Link to='/login'>Log In</Link> to your account.</p>
                    </div>
                <div className="register-options">
                    <h3>Sign-Up Options</h3>
                    <div className="options">
                        <a class="google" href={BACK_END_URL+'/auth/register/google'}>Google Sign-Up</a>
                    </div>
                    {this.props.fail && (
                        <div className="fail">
                            <p>This account already exists.</p>
                            <p>Please <Link to='/register'>log-in</Link> to your account.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        )
    }
}

export default Register
