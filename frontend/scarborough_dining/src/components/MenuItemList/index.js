import React, { Component } from 'react';
import MenuItem from '../MenuItem';

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
                <h2>Menu</h2>
                {this.state.menuItems.length > 0 ? (
                    <React.Fragment>
                        <div className="menu-item-list">
                            <div className="row">
                                {
                                    this.state.menuItems.map(menuItem => {
                                        return <MenuItem userId={this.props.userId} loggedIn={this.props.loggedIn} key={menuItem._id} menuItem={menuItem} />
                                    })
                                }
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <h6>Sorry, this restaurant hasn't uploaded any items yet.</h6>
                )}
            </React.Fragment>
        )
    }
}
