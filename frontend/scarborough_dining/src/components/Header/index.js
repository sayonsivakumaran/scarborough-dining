import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './styles.css';

export class Header extends Component {

    render() {
        return (
            <header className="headerStyle">
                <h1 className="title">Scarborough Dining</h1>
                <Link to="/" className="linkStyle non-last-linkStyle">Home</Link>
                <Link to="/account-creation/user" className="linkStyle non-last-linkStyle">Sign-Up for an Account</Link>  
                <Link to="/account-creation/restaurant" className="linkStyle non-last-linkStyle">Register Restaurant</Link>
                <Link to="/manage-restaurant-information" className="linkStyle">Manage Restaurant Information</Link>
            </header>
        )
    }
}

export default Header

