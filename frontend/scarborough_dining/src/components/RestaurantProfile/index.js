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

        let res = data.find(restaurant => restaurant.id == this.props.match.params.id);;

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
                <div className="restaurant-info">
                    <h1>{name}</h1>
                    <h2>{description}</h2>
                    <h3>{address} | {phone}</h3>
                </div>
                <header className="restaurant-header">
                    <Link to={`/restaurants/${id}`} style={linkStyle}>Menu</Link> | 
                    <Link to={`/restaurants/${id}/info`} style={linkStyle}>Info</Link>
                </header>
                <Switch>
                    <Route exact path={`/restaurants/${id}`}>
                        <div>
                            <h1>Menu</h1>
                        </div>
                    </Route>
                    <Route path={`/restaurants/${id}/info`}>
                        <div>
                            <h1>Info</h1>
                        </div>
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

export default RestaurantProfile;
