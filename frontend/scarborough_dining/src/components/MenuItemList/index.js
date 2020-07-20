import React, { Component } from 'react';
import MenuItem from '../MenuItem';
import data from '../../mock/restaurant.json';

export default class MenuItemList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="menu-item">
                    <h2 className="menu-item-list-title mb-4 font-weight-bold">Restaurants</h2>
                    <div className="card-columns">
                        {
                            data.map(restaurant => {
                                return <MenuItem key={restaurant.id} restaurant={restaurant} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
