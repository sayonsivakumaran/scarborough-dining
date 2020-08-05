import React, { Component } from 'react'
import { Switch, Route, Link} from 'react-router-dom';
import axios from 'axios'

export class Dashboard extends Component {

    state = {
        displayName: "",
        ratings: {},
        favourites: {}
    }
    
    componentDidMount() {
        axios.get('/auth/login/success')
            .then(results => this.setState({
                displayName: results.data.user.displayNamem,
                firstName: results.data.user.firstName,
                lastName: results.data.user.lastName,
                ratings: results.data.user.ratings,
                favourites: results.data.user.favourites   
            })
        )
    }

    render() {
        const ratingsEmpty = Object.keys(this.state.ratings).length === 0
        const favouritesEmpty = Object.keys(this.state.favourites).length === 0
        return (
            <div>
                <h1>Dashboard</h1>
                <div className="account-information">
                    <h2>Account Information</h2>
                    <p>Name: {this.state.firstName} {this.state.lastName}</p>
                    <p>Address:</p>
                    <p>Postal Code:</p>
                    <Link to='/account-creation/user'>Edit Account</Link>
                </div>
                <div className="favourites">
                    <h2>Favourite Restaurants</h2>
                    {favouritesEmpty && (
                        <p>You have not favourated any restaurants yet.</p>
                    )}
                </div>
                <div className="ratings">
                    <h2>Your Restaurant Ratings</h2>
                    {ratingsEmpty && (
                        <p>You have not rated any restaurants yet.</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Dashboard
