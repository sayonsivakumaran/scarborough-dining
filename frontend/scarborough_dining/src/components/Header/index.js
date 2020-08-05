import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export class Header extends Component {

    state = {
        loggedIn: false
    }
    
    componentDidMount() {
        axios.get('/auth/login/success')
            .then(results => this.setState({
                loggedIn: results.data.success,
                displayName: results.data.user.displayName,
                restaurantId: results.data.user.restaurantId,
                ratings: results.data.user.ratings,
                favourites: results.data.user.favourites,
                admin: results.data.user.admin
            })
        )
    }

    render() {
        const loggedIn = this.state.loggedIn;
        const restaurantId = this.state.restaurantId == undefined
        const admin = this.state.admin
        let BACK_END_URL = ''
        if (process.env.NODE_ENV === "production") {
            BACK_END_URL = "/" 
        } else { 
            BACK_END_URL = "http://localhost:5000" 
        }
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
                        {/* TODO: Allow only signed in users to see this tab. */}
                        {/*
                        <li class="nav-item">
                            <Link class="nav-link link" to="/account-creation/restaurant">Register Restaurant</Link>
                        </li>
                        */}
                        {(admin) && (
                            <li class="nav-item">
                                <Link class="nav-link link" to="/manage-restaurants">Manage Requested Restaurants</Link>
                            </li>
                        )}
                        {restaurantId ? (
                            <li class="nav-item">
                            </li>
                        ) : (
                            <li class="nav-item">
                            <Link class="nav-link link" to="/manage-restaurant-information">Manage Restaurant Information</Link>
                            </li>
                        )}
                        {loggedIn ? (
                            <li class="nav-item">
                                <a class="nav-link link" href={BACK_END_URL+"/auth/logout"}>Logout</a>
                            </li>
                        ) : (
                            <li class="nav-item">
                                <Link class="nav-link link" to="/login">Log In</Link>
                            </li>
                        )}
                        {loggedIn ? (
                            <li class="nav-item">
                                <Link class="nav-link link" to="/dashboard">Account</Link>
                            </li>
                        ) : (
                            <li class="nav-item">
                                <Link class="nav-link link" to="/register">Register</Link>
                            </li>
                        )}
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header

