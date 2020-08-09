import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

export default class Post extends Component {
    constructor(props) {
        super(props);
        if (this.props.post) {
            this.state = {
                title: this.props.post.title,
                content: this.props.post.content,
                displayName: this.props.post.displayName,
                restaurantId: this.props.post.restaurantId,
                restaurantName: this.props.post.restaurantName,
                posterGoogleId: this.props.post.posterGoogleId,
                imageURLs: this.props.post.imageURLs,
                postId: this.props.post._id
            }
        }
    }

    render() {
        let imageUrl = this.state.imageURLs[0];
        return ( 
            <div class="card">
                {console.log(this.state)}
            <div class="card-header">
                <h5 class="card-title">{this.state.title}</h5>
            </div>
            <div class="card-body">
                <p class="card-text">{this.state.content}</p>
            {imageUrl && 
                <div className="image">
                    <button type="button" class="btn btn-image" data-toggle="modal" data-target={"#modal"+this.state.postId}>
                        <img class="img-thumbnail" src={imageUrl}/>
                    </button>

                    <div id={"modal"+this.state.postId} class="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <img class="img-fluid img-modal" src={imageUrl}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            }
            <a href={`#/restaurants/`+ this.state.restaurantId} class="btn btn-primary">Visit Restaurant</a>
            </div>
            <div class="card-footer text-muted">
                <span className="footer-text">By {this.state.displayName} from {this.state.restaurantName}</span>
                <button type="button" onClick={(event) => this._removeRestaurant(event,id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>     
            </div>
            </div>
        )
    }
}
