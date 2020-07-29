import React, { Component } from 'react';
import MenuItem from '../MenuItem';
import data from '../../mock/restaurant.json';
import './styles.css';

const menuItems = [{
    name: "Dish1",
    price: 3.99,
    imageURL: "f",
    description: "This food is yummpy",
    _id: "2",
    restaurantId: "1"
},
{
    name: "Dish1",
    price: 3.99,
    imageURL: "f",
    description: "This food is yummpy",
    _id: "3",
    restaurantId: "1"
},
{
    name: "Dish1",
    price: 3.99,
    imageURL: "f",
    description: "This food is yummpy",
    _id: "4",
    restaurantId: "1"
},
{
    name: "Dish1",
    price: 3.99,
    imageURL: "f",
    description: "This food is yummpy",
    _id: "5",
    restaurantId: "1"
},
{
    name: "Dish1",
    price: 3.99,
    imageURL: "f",
    description: "This food is yummpy",
    _id: "6",
    restaurantId: "1"
}];

export default class MenuItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: this.props.restaurantId,
            menuItems: this.props.menuItems
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="menu-item-list">
                    <div className="card-columns">
                        {
                            this.state.menuItems.map(menuItem => {
                                return <MenuItem onUpdateShoppingCart={this.props.onUpdateShoppingCart} loggedIn={this.props.loggedIn} key={menuItem._id} menuItem={menuItem} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
