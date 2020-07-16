import React, { Component } from 'react'
import GoogleBtn from './GoogleBtn';
import {Link} from 'react-router-dom';
import './style/Header.css';


export class Header extends Component {

    state = {
        id: '',
        accessToken: '',
        isLoggedIn: false
    }

    sendAccountData = () => {
        this.props.checkLogin(this.state);
    }

    setLoggedIn = (data) => {
        this.setState({
            id: data.id,
            accessToken: data.accessToken,
            isLogined: true
        });
        this.sendAccountData();
    }

    setLoggedOut = (data) => {
        this.setState({
            id: '',
            accessToken: '',
            isLogined: false
        });
        this.sendAccountData();
    }

    render() {
        return (
            <header className="headerStyle">
                <h1 className="title">Scarborough Dining</h1>
                <Link to="/" className="linkStyle">Home</Link> |
                <Link to="/account-creation/user" className="linkStyle">Sign-Up for an Account</Link> |    
                <Link to="/account-creation/restaurant" className="linkStyle">Register Restaurant</Link> |
                <Link to="/manage-restaurant-information" className="linkStyle">Manage Restaurant Information</Link> |
                <Link className="linkStyle"><GoogleBtn login={this.setLoggedIn.bind(this)} logout={this.setLoggedOut.bind(this)} className="google-btn"/></Link>
            </header>
        )
    }
}


export default Header;

