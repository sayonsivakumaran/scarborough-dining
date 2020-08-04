import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class LogIn extends Component {
    render() {
        return (
            <div>
                <h1>Log In</h1>
                <p>Don't have an account? <Link to='/register'>Register</Link> for an account.</p>
                <h2>Log into an account through Google</h2>
                <a class="nav-link link" href="http://localhost:5000/auth/login/google">Login</a>
            </div>
        )
    }
}

export default LogIn
