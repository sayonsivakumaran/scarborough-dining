import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import './styles.css';

export class Dashboard extends Component {

    state = {
        loggedIn: false,
        ratings: {},
        favourites: {},
        restaurantId: undefined
    }

    async componentDidMount() {
        await axios.get('/auth/login/success')
          .then(results => this.setState({
            loggedIn: true,
            id: results.data.user.googleId
          })
        ).catch(err => this.setState({
                loggedIn: false
            })
        );
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
                })
            );
        }

        if (!(this.state.restaurantId === undefined)) {
            await axios.get(`/restaurants/${this.state.restaurantId}`)
            .then(results => this.setState({
                restaurantName: results.data.name,
                verified: results.data.verified
            }))
        }
    }

    render() {
        const ratingsEmpty = Object.keys(this.state.ratings).length === 0
        const favouritesEmpty = Object.keys(this.state.favourites).length === 0
        const restaurantEmpty = this.state.restaurantId === undefined
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <div className="account-information">
                    <h2>Account Information</h2>
                    <p>Name: {this.state.firstName} {this.state.lastName}</p>
                    <p>Address: {this.state.address}</p>
                    <p>City: {this.state.city}</p>
                    <p>Province: {this.state.province}</p>
                    <p>Postal Code: {this.state.postalCode}</p>
                    <p><Link to='/account-information'>Edit Account Information</Link></p>
                </div>
                <hr/>
                <div className="favourites">
                    <h2>Favourite Restaurants</h2>
                    {favouritesEmpty && (
                        <p>You have not favourited any restaurants yet.</p>
                    )}
                </div>
                <hr/>
                <div className="ratings">
                    <h2>Your Restaurant Ratings</h2>
                    {ratingsEmpty && (
                        <p>You have not rated any restaurants yet.</p>
                    )}
                </div>
                <hr/>
                <div className="restaurant-information">
                    <h2>Restaurant Information</h2>
                    {restaurantEmpty && (
                        <p>Have a restaurant. Register your restaurant <a href={'http://localhost:3000/#/account-creation/restaurant'}>Here</a></p>
                    )}
                    {!restaurantEmpty && this.state.verified && (
                        <p><a href={'http://localhost:3000/#/restaurants/' + this.state.restaurantId}>{this.state.restaurantName}</a>: Verified</p>
                    )}
                    {!restaurantEmpty && !this.state.verified && (
                        <p>{this.state.restaurantName} : Verification Pending...</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Dashboard
