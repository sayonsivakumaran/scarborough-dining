import React, { Component } from 'react';
import Restaurant from '../Restaurant';
import data from '../../mock/restaurant.json';
import '../Restaurant/styles.css'
export default class RestaurantList extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="jumbotron jumbotron-fluid">
                    <div class="header">
                        <h1 class="display-4 title">Scarborough Dining</h1>
                    </div>
                </div>
                <div className="restaurants">
                <h2 className="restaurant-list-title mb-4 font-weight-bold">Restaurants</h2>
                    <div className="card-columns">
                        {
                            data.map(restaurant => {
                                return <Restaurant key={restaurant.id} restaurant={restaurant} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
