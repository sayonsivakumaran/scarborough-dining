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
        console.log(props);
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

    _getRestaurantInfo(id) {
        axios.get('/restaurants/' + id).then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                picture: response.data.imageURLs[0],
                description: response.data.description,
                phoneNumber: response.data.phoneNumber,
                id: response.data._id,
                menuItems: response.data.menuItems
            });
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="restaurant-profile">
                    <div className="restaurant-info row">
                        <div className="picture-container col-12">
                            <img className="profile-logo" src={this.state.picture} />
                        </div>
                        <div className="text-container col-12">
                            <h1 className="mb-4 font-weight-bold">{this.state.name}</h1>
                            <p className="description">{this.state.description}</p>
                            <p className="address-phone">{this.state.address} | {this.state.phoneNumber}</p>
                        </div>
                        <div class="video-container col-12"> 
                                <ReactPlayer 
                                    url="https://www.youtube.com/watch?v=KN3Py0duFto"
                                />
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
                                <MenuItemList loggedIn={this.props.loggedIn}  menuItems={this.state.menuItems} />
                            </div>
                        </Route>
                        <Route path={`/restaurants/${this.state.id}/info`}>
                            <div className="info">
                                <h1>Info</h1>
                            </div>
                        </Route>
                        <Route path={`/restaurants/${this.state.id}/announcements`}>
                            <div className="announcements">
                                <h1>Accouncements</h1>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantProfile;
