import React, { Component } from 'react';
import Restaurant from '../Restaurant';
import '../Restaurant/styles.css'
import axios from 'axios';
export default class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            totalRestaurants: 0
        }

        this._getRestaurantList();
    }

    _getRestaurantList() {
        axios.get('/restaurants').then(response => {
            console.log(response.data);
            this.setState({
                restaurants: response.data,
                totalRestaurants: response.data.length
            });
        })
    }


    render() {
        return (
            <React.Fragment>
                <div class="jumbotron jumbotron-fluid">
                    <div class="header">
                        <h1 class="display-4 title">Scarborough Dining</h1>
                    </div>
                </div>
                <div className="restaurants">
                <h2 className="restaurant-list-title mb-4 font-weight-bold">Scarborough Owned Restaurants</h2>
                    <div className="card-columns">
                        {
                            this.state.restaurants.map(restaurant => {
                                return <Restaurant key={restaurant._id} restaurant={restaurant} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
