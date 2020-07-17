import React, { Component } from 'react';
import data from '../../mock/restaurant.json';
import './styles.css'
import { Link, Switch, Route } from 'react-router-dom';

const linkStyle = {
    color: '#fff',
    padding: '1em 1em',
    textDecoration:'none'
}

class RestaurantProfile extends Component {
    state = { 
        menuItems: []
    }

    render() {
        let id, name, picture, address, description, phone = "";

        let res = data.find(restaurant => restaurant.id == this.props.match.params.id);

        if (res) {
            name = res.name;
            picture = res.picture;
            address = res.address;
            description = res.description;
            phone = res.phone;
            id = res.id;
        }

        return (
            <React.Fragment>
                <div className="restaurant-profile">
                    <div className="restaurant-info row">
                        <div className="text-container col-md-4">
                            <h1 className="mb-4 font-weight-bold">{name}</h1>
                            <p>{description}</p>
                            <p>{address} | {phone}</p>
                        </div>
                        <div className="picture-container col-md-4 col-md-offset-4">
                            <img className="profile-logo" src={picture} />
                        </div>
                    </div>
                    <header className="restaurant-header">
                        <Link to={`/restaurants/${id}`} style={linkStyle}>Menu</Link> | 
                        <Link to={`/restaurants/${id}/info`} style={linkStyle}>Info</Link> |
                        <Link to={`/restaurants/${id}/announcements`} style={linkStyle}> Announcements </Link>
                    </header>
                    <Switch>
                        <Route exact path={`/restaurants/${id}`}>
                            <div className="menu">
                                <h1>Menu</h1>
                            </div>
                        </Route>
                        <Route path={`/restaurants/${id}/info`}>
                            <div className="info">
                                <h1>Info</h1>
                            </div>
                        </Route>
                        <Route path={`/restaurants/${id}/announcements`}>
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
