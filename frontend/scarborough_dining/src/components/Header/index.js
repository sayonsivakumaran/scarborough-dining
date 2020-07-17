import React, { Component } from 'react'
import GoogleBtn from '../Header/GoogleBtn';
import {Link} from 'react-router-dom';
import './styles.css';

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
            <header>
            <div class="navbar">
                <div class="links">
                    <Link class="link" to="/" class="link">Home</Link>
                    <Link class="link" to="/account-creation/user">Sign-Up for an Account</Link>  
                    <Link class="link" to="/account-creation/restaurant">Register Restaurant</Link>
                    <Link class="link" to="/manage-restaurant-information">Manage Restaurant Information</Link>
                    <Link className="linkStyle"><GoogleBtn login={this.setLoggedIn.bind(this)} logout={this.setLoggedOut.bind(this)} className="google-btn"/></Link>
                </div>
            </div>
            </header>
        )
    }
}

export default Header

