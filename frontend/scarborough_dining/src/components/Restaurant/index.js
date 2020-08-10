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
                id: this.props.restaurant._id,
                cuisineTypes: this.props.restaurant.cuisineTypes,
                yearEstablished: this.props.restaurant.yearEstablished
            }
        }
    }
    
    render() {
        return (
            <Link className="col-md-4 d-flex align-items-stretch text-link" to={`/restaurants/${this.state.id}`}>
                <div className="card mb-4">
                    <img className="card-img-top" alt={this.state.name + "logo"} src={this.state.picture} />
                    <div class="card-body"> 
                        <h4 className="card-title">{this.state.name}</h4>
                        
                        <p className="card-text address">
                        <i class="fa fa fa-map-marker" aria-hidden="true"></i>
                            {this.state.address}
                        </p>
                        <p className="card-text">{this.state.description}</p>

                        <ul class="list-group list-group-flush">
                            {}
                            <li className="list-group-item">
                                {this.state.yearEstablished &&
                                "Since " + this.state.yearEstablished
                                }
                            </li>
                            <li class="list-group-item">
                                <p className="categories" >
                                    {this.state.cuisineTypes.map(cuisine => {
                                        return <span className="category">{cuisine}</span>
                                    })}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </Link>
        )
    }
}
