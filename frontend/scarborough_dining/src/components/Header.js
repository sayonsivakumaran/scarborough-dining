import React, { Component } from 'react'
import {Link} from 'react-router-dom';

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
    
    customerUser = () => {
        this.props.changeUserType("customer");
    }

    restaurantUser = () => {
        this.props.changeUserType("restaurant");
    }

    render() {
        return (
            <header style={headerStyle}>
                <h1 style={{fontSize: '3em'}}>Scarborough Dining</h1>
                <Link to="/" style={linkStyle}>Home</Link> | 
                <Link to="/account-creation" style={linkStyle} onClick={this.customerUser}>Sign-Up for an Account</Link> |    
                <Link to="/account-creation" style={linkStyle} onClick={this.restaurantUser}>Register Restaurant</Link>
            </header>
        )
    }
}

export default Header

