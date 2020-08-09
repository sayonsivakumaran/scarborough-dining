import React, { Component } from 'react';
import './styles.css'
import { Link, Switch, Route } from 'react-router-dom';
import ReactPlayer from "react-player"
import axios from 'axios';
import ManageAnnouncements from '../ManageAnnouncements';

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
            menuItems: [],
            announcements: [],
            activeTab: "info"
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
                profileImage : response.data.imageURLs[0],
                videoUrl: response.data.introVideoURL,
                description: response.data.longDescription
            });
        })
    }

    /**
     * Sets activeTab to the event
     */
    _setTab = (e) => {
        this.setState({
            activeTab: e.target.name
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="restaurant-profile">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item">
                            <Link name="info" className={this.state.activeTab == "info" ? "nav-link active" : "nav-link"} onClick={this._setTab} to={`/restaurants/${this.state.id}`}>Info</Link>  
                        </li>
                        <li class="nav-item">
                            <Link name ="menu" className={this.state.activeTab == "menu" ? "nav-link active" : "nav-link"} onClick={this._setTab} to={`/restaurants/${this.state.id}/menu`}>Menu</Link>  
                        </li>
                        <li class="nav-item">
                            <Link name="announcements" className={this.state.activeTab == "announcements" ? "nav-link active" : "nav-link"} onClick={this._setTab} to={`/restaurants/${this.state.id}/announcements`}>Announcements</Link>  
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path={`/restaurants/${this.state.id}`}>
                            <div className="restaurant-info">
                                <div className="row">
                                    <div className="restaurant-title col-md-12">
                                        <h2 className="title">{this.state.name}</h2>
                                    </div>
                                    <div className="restaurant-other-info col-md-12">
                                        <h4 className="address">
                                            <i class="fa fa fa-map-marker" aria-hidden="true"></i>{this.state.address}
                                        </h4>
                                        <h4 className="phone">
                                            <i class="fa fa-phone" aria-hidden="true"></i>{this.state.phoneNumber}
                                        </h4>
                                    </div>
                                    <div className="image-text-container col-md-12">
                                        <img className="profile-logo pull-left mr-4" src={this.state.profileImage}/>
                                        <p className="text">{this.state.description}</p>
                                    </div>
                                    {this.state.videoUrl &&
                                        <div className="video-container col-12">
                                            <ReactPlayer className="videoPlayer"
                                                url={this.state.videoUrl}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </Route>
                        <Route path={`/restaurants/${this.state.id}/menu`}>
                            {/* TODO: This should be a new component */}
                            <div className="menu">
                                <h1>Menu</h1>
                            </div>
                        </Route>
                        <Route path={`/restaurants/${this.state.id}/announcements`}>
                            {/* TODO: This should be a new component */}
                            <ManageAnnouncements isManager={false}/>
                        </Route>
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantProfile;
