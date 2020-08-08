import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
    
class RestaurantVerification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestedRestaurants: [],
            totalRequestedRestaurants: 0
        };
        
    }

    async componentDidMount() {
        await this._getUnregistedRestaurants();
    }

    _removeRestaurant = async (e, id) => {
        await axios.delete('/restaurants/' + id).then(response => {
            console.log(response);
        })

        await this._getUnregistedRestaurants();
    }

    _verifyRestaurant = async (e, id) => {
        await axios.post('/restaurants/verify/' + id).then(response => {
            console.log(response);
        })

        await this._getUnregistedRestaurants();
    }
    /**
     * Gets all unregisterd restaurants and its owner information
     */
    async _getUnregistedRestaurants() {
        let restaurants //, owner;

        await axios.get('/restaurants/unverified').then(response => {
            restaurants = response.data
        })

        /*
        for (var i = 0; i < restaurants.length; i++) {
            owner = await axios.get('/owners/' + restaurants[i].ownerID);
            if (owner && owner.data) {
                restaurants[i].owner = owner.data;
            }
        }
        */

        this.setState({
            requestedRestaurants: restaurants,
            totalRequestedRestaurants: restaurants.length
        });
    }
    

    _getRestaurantElement(restaurants) {
        let restaurantTables = [];
        let name, email, phoneNumber;

        for (var i = 0; i < restaurants.length; i++) {
            if (restaurants[i].owner) {
                name = restaurants[i].owner.firstName;
                email = restaurants[i].owner.email;
                phoneNumber = restaurants[i].owner.phoneNumber;
            }
            let id = restaurants[i]._id;
            restaurantTables.push(
                <tr className="unverified-restaurant-row" key={id}>
                    <td>{restaurants[i].name}</td>
                    <td>{restaurants[i].address}</td>
                    <td>{restaurants[i].city}</td>
                    <td>{restaurants[i].postalCode}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phoneNumber}</td>
                    <td>
                        <button type="button" onClick={(event) => this._removeRestaurant(event,id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>     
                    </td>
                    <td>
                        <button type="button" onClick={(event) => this._verifyRestaurant(event, id)} class="btn check-btn"><i class="fa fa-check"></i></button>     
                    </td>
                </tr>
            )
        }
        return restaurantTables;
    }


    render() {
        return (
            <div class="manageRestaurantPage">
                <h2>Requested Restaurants</h2>
                <h4 className="total">{this.state.totalRequestedRestaurants} Restaurants</h4>
                {this.state.totalRequestedRestaurants > 0 ? (
                        <table className="table table-responsive table-hover">
                            <thead class="table-header">
                                <tr className="t-header">
                                    <th scope="col">Restaurant Name</th>
                                    <th scope="col">Restaurant Address</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Postal Code</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this._getRestaurantElement(this.state.requestedRestaurants)}
                            </tbody>
                        </table>
                ) : (
                    <div className="empty-message">No requested restaurants</div>
                )}
            </div>
        )
    }

}

export default RestaurantVerification;
