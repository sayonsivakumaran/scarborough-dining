import React, { Component } from 'react'
import GoogleBtn from '../Header/GoogleBtn';
import {Link} from 'react-router-dom';
import './styles.css';
import { SearchField } from '../Search/searchField';

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
            isLoggedIn: true
        });
        this.sendAccountData();
    }

    setLoggedOut = (data) => {
        this.setState({
            id: '',
            accessToken: '',
            isLoggedIn: false
        });
        this.sendAccountData();
    }

    render() {
        return (
            <header>
            <div class="navbar">
                <div class="links">
                    <Link class="link" to="/" class="link">Home</Link>
                    <Link class="link" to="/account-creation/user">Sign-Up for an Account</Link>  
                    <Link class="link" to="/account-creation/restaurant">Register Restaurant</Link>
                    <Link class="link" to="/manage-restaurant-information">Manage Restaurant Information</Link>
                    <Link class="link"><GoogleBtn login={this.setLoggedIn.bind(this)} logout={this.setLoggedOut.bind(this)} className="google-btn"/></Link>
                </div>
                <SearchField></SearchField>
            </div>
            </header>
        )
    }
}

export default Header

