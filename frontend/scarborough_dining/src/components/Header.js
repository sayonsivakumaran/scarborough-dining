import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Modal} from 'react-bootstrap';
import LogIn from './LogIn';
import {Link} from 'react-router-dom';
import './style/Header.css';


export class Header extends Component {

    openLoginModal = () => {
        this.refs.LogIn.open();
    }

    render() {
        return (
            <header className="headerStyle">
                <h1 className="title">Scarborough Dining</h1>
                <Link to="/" className="linkStyle">Home</Link> |
                <Link to="/login" className="linkStyle">Log-In</Link> |
                <Link to="/account-creation/user" className="linkStyle">Sign-Up for an Account</Link> |    
                <Link to="/account-creation/restaurant" className="linkStyle">Register Restaurant</Link> |
                <Link to="/manage-restaurant-information" className="linkStyle">Manage Restaurant Information</Link>
            </header>
        )
    }
}


export default Header;

