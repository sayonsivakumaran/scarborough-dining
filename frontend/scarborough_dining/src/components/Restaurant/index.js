import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function ratings(rating) {
    var ratings = [];
    for (var i = 0; i < rating; i++) {
        ratings.push(
            <span class="fa fa-star checked"></span>
        )
    }
    return ratings
}
export default class Restaurant extends Component {
    constructor(props) {
        super(props);

        if (this.props.restaurant) {
            this.state = {
                name: this.props.restaurant.name,
                picture: this.props.restaurant.picture,
                address: this.props.restaurant.address,
                description: this.props.restaurant.description,
                id: this.props.restaurant.id,
                rating: this.props.restaurant.rating
            }
        }
    }
    
    render() {
        return (
            <Link className="text-link" to={`/restaurants/${this.state.id}`}>
                <div className="card">
                    <img className="card-img-top" src={this.state.picture} />
                    <div class="card-body"> 
                        <p className="title">{this.state.name}</p>
                        <p className="description">{this.state.address}</p>
                        <p className="description">{this.state.description}</p>
                        <div className="rating">
                            {ratings(this.state.rating)}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
