import React, { Component } from 'react';
import MenuItem from '../MenuItem';
import './styles.css';

export default class MenuItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            menuItems: []
        }
    }

    componentDidMount() {
        this.setState({
            restaurantId: this.props.restaurantId,
            menuItems: this.props.menuItems
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="menu-item-list">
                    <div className="card-columns">
                        {
                            this.state.menuItems.map(menuItem => {
                                return <MenuItem userId={this.props.userId} loggedIn={this.props.loggedIn} key={menuItem._id} menuItem={menuItem} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
