import React, { Component } from 'react';
import MenuItemList from '../MenuItemList';
import data from '../../mock/restaurant.json';
import './styles.css'
import { Link, Switch, Route } from 'react-router-dom';
import ReactPlayer from "react-player"
import axios from 'axios';

class RestaurantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            address: "",
            picture: "",
            description: "",
            phoneNumber: "",
            id: null,
            menuItems: []
        }
        let id = this.props.match.params.id;

        this._getRestaurantInfo(id);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    _getRestaurantInfo(id) {
        axios.get('/restaurants/' + id).then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                picture: response.data.logoURL,
                description: response.data.description,
                phoneNumber: response.data.phoneNumber,
                id: response.data._id,
                menuItems: response.data.menuItems,
                profileImage : response.data.imageURLs[0],
                videoUrl: response.data.introVideoURL,
                description: response.data.longDescription
            });
            console.log(this.state.menuItems);
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="restaurant-profile">
                    <div className="restaurant-info">
                        <div className="row">        
                            <div className="restaurant-title col-md-12">
                                <h2 className="title">{this.state.name}</h2>
                            </div>
                            <div className="image-text-container col-md-12">
                                <img className="profile-logo pull-left mr-4" src={this.state.profileImage}/>
                                <p className="text">{this.state.description}</p>
                            </div>
                            <div className="video-container col-12">
                                <ReactPlayer className="videoPlayer"
                                    url={this.state.videoUrl}
                                />
                            </div>
                        </div>
                    </div>
                    <header className="restaurant-header">
                        <Link to={`/restaurants/${this.state.id}`} className="linkStyle">Menu</Link> | 
                        <Link to={`/restaurants/${this.state.id}/info`} className="linkStyle">Info</Link> |
                        <Link to={`/restaurants/${this.state.id}/announcements`} className="linkStyle"> Announcements </Link>
                    </header>
                    <Switch>
                        <Route exact path={`/restaurants/${this.state.id}`}>
                            <div className="menu">
                                <h1>Menu</h1>
                                <MenuItemList loggedIn={this.props.loggedIn} onUpdateShoppingCart={this.props.onUpdateShoppingCart} menuItems={this.state.menuItems} />
                            </div>
                        </Route>
                        <Route path={`/restaurants/${this.state.id}/info`}>
                            <div className="info">
                                <h1>Info</h1>
                            </div>
                        </Route>
                        <Route path={`/restaurants/${this.state.id}/announcements`}>
                            <div className="announcements">
                                <h1>Announcements</h1>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantProfile;
