import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
    
class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: {},
            totalItems: 0,
            userGoogleId: ''
        };
    }

    async componentDidMount() {
        await axios.get(`/user/get-shopping-cart/${this.props.userGoogleId}`)
            .then(res => this.setState({
                shoppingCart: res.data,
                totalItems: res.data.length
            }))
            .catch(err => err);
        this.setState({
            userGoogleId: this.props.userGoogleId
        });
    }
    
    _removeMenuItems = (e, id) => {
        let {shoppingCart} = this.state;
        delete shoppingCart[id];

        this.setState({
            shoppingCart: shoppingCart
        });
    }

    _getShoppingCartItems(shoppingCart) {
        let shoppingCartTables = [];
        
        for (var i = 0; i < shoppingCart.length; i++) {
            let id = shoppingCart[i]._id;
            shoppingCartTables.push(
                <tr className="unverified-restaurant-row" key={id}>
                    <td><img className="shopping-cart-image" src={shoppingCart[i].imageURL}/></td>
                    <td>{shoppingCart[i].name}</td>
                    <td>${shoppingCart[i].price}</td>
                    <td>{shoppingCart[i].total}</td>
                    <td>${(shoppingCart[i].total * shoppingCart[i].price).toFixed(2)}</td>
                    <td>
                        <button type="button" onClick={(event) => this._removeMenuItems(event,id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>     
                    </td>
                </tr>
            )
        }
        return shoppingCartTables;
    }

    _postShoppingCartData = async shoppingCart => {
        let restaurantOrderMap = {};

        for (let i = 0; i < shoppingCart.length; i++) {
            let restaurantID = shoppingCart[i].restaurantID;
            shoppingCart[i].userGoogleId = this.state.userGoogleId;
            if (!restaurantOrderMap[restaurantID]) {
                restaurantOrderMap[restaurantID] = [];
            }

            restaurantOrderMap[restaurantID] = restaurantOrderMap[restaurantID].concat([shoppingCart[i]]);
        }


        let responses = Object.keys(restaurantOrderMap).map(restaurantID => axios.post(`/restaurants/addOrderRequest/${restaurantID}`, restaurantOrderMap[restaurantID]));
        return Promise.all(responses)
            .then(response => response)
            .catch(e => e);
    }

    render() {
        return (
            <div class="shoppingCartPage">
                <h2>Shopping Cart</h2>

                {/* TODO: image, item name, total ordered, individual price, total price */}
                <h4 className="total">{this.state.totalItems} Items</h4>
                {this.state.totalItems > 0 ? (
                    <React.Fragment>
                        <table className="table table-responsive table-hover">
                            <thead class="table-header">
                                <tr className="t-header">
                                    <th scope="col">Item Image</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Item Price</th>
                                    <th scope="col">Total Items</th>
                                    <th scope="col">Total Cost</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this._getShoppingCartItems(Object.values(this.state.shoppingCart))}
                            </tbody>
                        </table>
                        <input onClick={() => this._postShoppingCartData(Object.values(this.state.shoppingCart))} className="submit-shopping-cart-modal-button" name="submitShoppingCart" type="submit" value="Submit Order"/>
                    </React.Fragment>
                ) : (
                    <div className="empty-message">No items inside shopping cart</div>
                )}
            </div>
        )
    }

}

export default ShoppingCart;
