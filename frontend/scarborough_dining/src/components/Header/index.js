import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles.css';

export class Header extends Component {

    state = {
        loggedIn: false
    }
    
    async componentDidMount() {
        await axios.get('/auth/login/success')
          .then(results => this.setState({
            loggedIn: true,
            id: results.data.user.googleId,
            admin: results.data.user.admin
          }))
          .catch(err => this.setState({
                loggedIn: false
          }));
    
        if (this.state.loggedIn) {
          await axios.get(`/user/${this.state.id}`)
            .then(results => this.setState({
              firstName: results.data.firstName,
              lastName: results.data.lastName,
              address: results.data.address,	
              city: results.data.city,	
              postalCode: results.data.postalCode,	
              province: results.data.province,
              restaurantId: results.data.restaurantId
            }));
        }
      }

    render() {
        const loggedIn = this.state.loggedIn;
        const restaurantId = this.state.restaurantId === undefined
        const admin = this.state.admin
        let BACK_END_URL = ''
        if (process.env.NODE_ENV === "production") {
            BACK_END_URL = "/" 
        } else { 
            BACK_END_URL = "http://localhost:5000" 
        }
        return (
            <header>
                <nav class="navbar navbar-expand-xl fixed-top navbar-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <a class="navbar-brand" href="#">
                        <img src="find_dining_logo_horizontal.png" width="128" height="50" class="img-responsive d-inline-block align-top" alt=""/>
                    </a>

                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link link" to="/">Home</Link>
                        </li>
                        {/* TODO: Allow only signed in users to see this tab. */}
                        {loggedIn && restaurantId &&
                        <li class="nav-item">
                            <Link class="nav-link link" to="/account-creation/restaurant">Register Restaurant</Link>
                        </li>
                        }
                        {(admin) && (
                            <li class="nav-item">
                                <Link class="nav-link link" to="/manage-restaurants">Manage Requested Restaurants</Link>
                            </li>
                        )}
                        {restaurantId ? (
                            <li class="nav-item">
                            </li>
                        ) : (
                            <React.Fragment>
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
                                    <Link class="nav-link link" to='/order-requests'>Order Requests</Link>
                                </li>
                            </React.Fragment>
                        )}
                        {loggedIn ? (
                            <React.Fragment>
                                <li class="nav-item">
                                    <a class="nav-link link" href={BACK_END_URL+"/auth/logout"}>Log Out</a>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link link" to="/shopping-cart">Shopping Cart</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link link" to="/dashboard">Account</Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li class="nav-item">
                                    <Link class="nav-link link" to="/login">Log In</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link link" to="/register">Register</Link>
                                </li>
                            </React.Fragment>
                        )}
                        <li class="nav-item">
                            <Link class="nav-link link" to="/discussion-board">Community Board</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header

