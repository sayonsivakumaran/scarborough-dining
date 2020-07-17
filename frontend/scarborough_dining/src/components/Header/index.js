import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './styles.css';

export class Header extends Component {

    render() {
        return (
            <header>
            <div class="navbar">
                <div class="links">
                    <Link class="link" to="/" class="link">Home</Link>
                    <Link class="link" to="/account-creation/user">Sign-Up for an Account</Link>  
                    <Link class="link" to="/account-creation/restaurant">Register Restaurant</Link>
                    <Link class="link" to="/manage-restaurant-information">Manage Restaurant Information</Link>
                </div>
            </div>
            </header>
        )
    }
}

export default Header

