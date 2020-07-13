import React, { Component } from 'react';
import Restaurant from './Restaurant';
import data from '../mock/restaurant.json';

export default class RestaurantList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="restaurants">
                <h2 className="title mb-4 font-weight-bold">Restaurants</h2>
                    <div className="row">
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
