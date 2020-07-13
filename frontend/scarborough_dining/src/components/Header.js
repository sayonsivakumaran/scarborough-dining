import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './style/Header.css';

const headerStyle = {
    background: '#000',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    padding: '1em 1em',
    textDecoration:'none'
}

export class Header extends Component {

    render() {
        return (
            <header className="headerStyle">
                <h1 className="title">Scarborough Dining</h1>
                <Link to="/" className="linkStyle">Home</Link> | 
                <Link to="/account-creation/user" className="linkStyle">Sign-Up for an Account</Link> |    
                <Link to="/account-creation/restaurant" className="linkStyle">Register Restaurant</Link>
            </header>
        )
    }
}

export default Header

