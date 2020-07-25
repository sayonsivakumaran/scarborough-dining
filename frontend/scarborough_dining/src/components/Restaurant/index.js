import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default class Restaurant extends Component {
    constructor(props) {
        super(props);

        if (this.props.restaurant) {
            this.state = {
                name: this.props.restaurant.name,
                picture: this.props.restaurant.logoURL,
                address: this.props.restaurant.address,
                description: this.props.restaurant.description,
                id: this.props.restaurant._id
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
                    </div>
                </div>
            </Link>
        )
    }
}
