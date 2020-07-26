import React, { Component } from 'react';
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

    _getRestaurantInfo(id) {
        axios.get('/restaurants/' + id).then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                picture: response.data.logoURL,
                description: response.data.description,
                phoneNumber: response.data.phoneNumber,
                id: response.data._id,
            });
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
                                <img className="profile-logo pull-left mr-4" src="mock/Culinary-Arts-Program-1.png"/>
                                {/* TODO: Change mock description to description from backend */}
                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At tempor commodo ullamcorper a lacus. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Lobortis feugiat vivamus at augue. Posuere urna nec tincidunt praesent semper. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Et malesuada fames ac turpis egestas integer eget aliquet. Viverra maecenas accumsan lacus vel facilisis volutpat est. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Libero id faucibus nisl tincidunt eget nullam non nisi. Tortor consequat id porta nibh venenatis cras sed. Lorem ipsum dolor sit amet consectetur. Venenatis a condimentum vitae sapien pellentesque habitant. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. At auctor urna nunc id cursus metus aliquam. Tempus urna et pharetra pharetra massa massa. Id velit ut tortor pretium viverra suspendisse potenti. Orci porta non pulvinar neque laoreet suspendisse.

                                Blandit massa enim nec dui nunc mattis enim. Urna molestie at elementum eu facilisis sed odio morbi. Porttitor eget dolor morbi non arcu risus quis. Sit amet cursus sit amet dictum sit amet. Risus nullam eget felis eget nunc lobortis mattis aliquam. Blandit libero volutpat sed cras ornare. Sem fringilla ut morbi tincidunt augue. Massa eget egestas purus viverra accumsan. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Vitae et leo duis ut diam quam nulla. Dolor purus non enim praesent elementum. Porta non pulvinar neque laoreet. Augue eget arcu dictum varius duis. Netus et malesuada fames ac turpis egestas integer eget aliquet. Sed id semper risus in hendrerit. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Turpis massa tincidunt dui ut ornare lectus sit amet. Pulvinar etiam non quam lacus suspendisse faucibus interdum.

                                Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Amet luctus venenatis lectus magna. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Vulputate dignissim suspendisse in est ante in. Cras sed felis eget velit aliquet sagittis. Est velit egestas dui id ornare arcu. Convallis aenean et tortor at risus viverra adipiscing. Vitae sapien pellentesque habitant morbi tristique. Amet tellus cras adipiscing enim eu turpis egestas pretium. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Ipsum dolor sit amet consectetur adipiscing. Molestie a iaculis at erat pellentesque adipiscing. Sem integer vitae justo eget magna fermentum. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Commodo sed egestas egestas fringilla phasellus. Sagittis eu volutpat odio facilisis mauris sit.

                                Pulvinar elementum integer enim neque volutpat. Quis vel eros donec ac odio tempor. Erat velit scelerisque in dictum non. Egestas sed sed risus pretium. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Massa sapien faucibus et molestie ac. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Praesent semper feugiat nibh sed pulvinar proin. Euismod nisi porta lorem mollis aliquam. Laoreet suspendisse interdum consectetur libero. Aliquet enim tortor at auctor urna nunc id. Et leo duis ut diam. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Urna condimentum mattis pellentesque id nibh tortor. Ultrices in iaculis nunc sed augue lacus viverra. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Nec nam aliquam sem et. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim.

                                Tortor posuere ac ut consequat semper viverra nam libero justo. Mi ipsum faucibus vitae aliquet nec ullamco</p>
                            </div>
                            <div className="video-container col-12">
                                {/* TODO: Change mock video url to video url from backend */} 
                                <ReactPlayer
                                    url="https://www.youtube.com/watch?v=KN3Py0duFto"
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
