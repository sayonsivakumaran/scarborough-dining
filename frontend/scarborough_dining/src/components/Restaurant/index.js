import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default class Restaurant extends Component {
    constructor(props) {
        super(props);

        if (this.props.restaurant) {
            this.state = {
                name: this.props.restaurant.name,
                picture: this.props.restaurant.imageURLs[0],
                address: this.props.restaurant.address,
                description: this.props.restaurant.description,
                id: this.props.restaurant._id,
                rating: this.props.restaurant.ratings
            }
        }
    }

    _getRatings(ratings) {
        var ratingComponent = [];
        var totalRating = 0;
        var averageRating = 0;
    
        if (ratings && ratings.length == 0) {
            ratingComponent.push(<span>No ratings yet</span>)
        } 
    
        for (var i = 0; i < ratings.length; i++) {
            totalRating = totalRating + ratings[i];
        }
    
        averageRating = totalRating / ratings.length;
    
        for (var i = 0; i < averageRating; i++) {
            ratingComponent.push(
                <span class="fa fa-star checked"></span>
            )
        }
        return ratingComponent;
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
                            {this._getRatings(this.state.rating)}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
