import React, {Component} from 'react';
import './Restaurants.css';

export default class Restaurant extends Component {
    render() {
        let id, name, picture, address, description = "";

        if (this.props.restaurant) {
            name = this.props.restaurant.name;
            picture = this.props.restaurant.picture;
            address = this.props.restaurant.address;
            description = this.props.restaurant.description;
            id = this.props.restaurant.id;

        }
        
        return (
            <div className="restaurant">
                <img className="logo" src={picture} />
                <p className="title">{name}</p>  
                <p className="description">{address}</p>
                <p className="description">{description}</p>
            </div>
        )
    }
}