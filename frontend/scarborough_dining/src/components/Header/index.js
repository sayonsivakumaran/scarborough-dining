import React, { Component, useState } from 'react'
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
                <nav class="navbar navbar-expand-lg fixed-top navbar-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link link" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link link" to="/account-creation/user">Sign-Up for an Account</Link>  
                        </li>
                        {/* TODO: Allow only signed in users to see this tab. */}
                        <li class="nav-item">
                            <Link class="nav-link link" to="/account-creation/restaurant">Register Restaurant</Link>
                        </li>
                        {/* TODO: Allow only signed in owners that are verified to see this tab. */}
                        <li class="nav-item dropdown">
                            <a class="nav-link link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Manage Restaurant Information
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link class="dropdown-item" to="/manage-restaurant-information/general">General</Link>
                                <Link class="dropdown-item" to="/manage-restaurant-information/announcements">Announcements</Link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link link"><GoogleBtn login={this.setLoggedIn.bind(this)} logout={this.setLoggedOut.bind(this)} className="google-btn"/></Link>
                        </li>
                        {/* TODO: Allow only specific internal (client) role to see this tab. */}
                        <li class="nav-item">
                            <Link class="nav-link link" to="/manage-restaurants">Manage Requested Restaurants</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header

