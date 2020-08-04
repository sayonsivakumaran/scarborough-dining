import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Register extends Component {
    render() {
        return (
            <div>
                <h1>Register</h1>
                <p>Have an account? <Link to='/login'>Log in</Link> to an account.</p>
                <h2>Register an acount through Google</h2>
                <a class="nav-link link" href="http://localhost:5000/auth/register/google">Register</a>
            </div>
        )
    }
}

export default Register
