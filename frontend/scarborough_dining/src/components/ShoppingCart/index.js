import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
    
class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: {},
            totalItems: 0,
            userGoogleId: '',
            submissionMessage: '',
            showDialog: false
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
    
    _removeMenuItems = async (id) => {
        await axios.post(`/user/delete-cart-item/${this.state.userGoogleId}/${id}`)
            .then(res => this.setState({
                shoppingCart: res.data,
                totalItems: res.data.length
            }))
            .catch(err => err);
    }

    _getShoppingCartItemsForRestaurant = (shoppingCart) => {
        let shoppingCartItemTables = [];
        for (let i = 0, l = shoppingCart.length; i < l; i++) {
            let id = shoppingCart[i].menuItemID;
            shoppingCartItemTables.push(
                <tr className="unverified-restaurant-row" key={id}>
                    <td><img className="shopping-cart-image" src={shoppingCart[i].imageURL}/></td>
                    <td>{shoppingCart[i].name}</td>
                    <td>${shoppingCart[i].price}</td>
                    <td>{shoppingCart[i].total}</td>
                    <td>${(shoppingCart[i].total * shoppingCart[i].price).toFixed(2)}</td>
                    <td>
                        <button type="button" onClick={async () => await this._removeMenuItems(id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>     
                    </td>
                </tr>
            )
        }
            
        return (
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
                    {shoppingCartItemTables}
                </tbody>
            </table>
        );
    }

    _getShoppingCartItems = shoppingCart => {
        let restaurantOrderMap = {};

        for (let i = 0; i < shoppingCart.length; i++) {
            let restaurantID = shoppingCart[i].restaurantID;
            if (!restaurantOrderMap[restaurantID]) {
                restaurantOrderMap[restaurantID] = [];
            }

            restaurantOrderMap[restaurantID] = restaurantOrderMap[restaurantID].concat([shoppingCart[i]]);
        }
        
        let shoppingCartTableArray = [];
        Object.keys(restaurantOrderMap).forEach(restaurantID => {
            shoppingCartTableArray.push(this._getShoppingCartItemsForRestaurant(restaurantOrderMap[restaurantID]));
        });

        return shoppingCartTableArray;
    }

    open = _ => {
        this.setState({
            showDialog: true
        });
    };

    close = _ => {
        this.setState({
            showDialog: false
        });
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
        axios.post(`/user/clear-shopping-cart/${this.state.userGoogleId}`);

        Promise.all(responses)
            .then(() => {
                this.setState({
                    shoppingCart: [],
                    totalItems: 0,
                    submissionMessage: 'Your items have succesfully been submitted!'
                });
                this.open();
            })
            .catch(() => {
                this.setState({
                    submissionMessage: 'Sorry, something went wrong on our end, please try again.'
                });
            });
    }

    render() {
        return (
            <div class="shoppingCartPage">
                <h2>Shopping Cart</h2>
                <h3 className="total">{this.state.totalItems} Total Items</h3>
                {this.state.totalItems > 0 ? (
                    <React.Fragment>
                        {this._getShoppingCartItems(Object.values(this.state.shoppingCart))}
                        <input onClick={() => this._postShoppingCartData(Object.values(this.state.shoppingCart))} className="submit-shopping-cart-modal-button" name="submitShoppingCart" type="submit" value="Submit Order"/>
                    </React.Fragment>
                ) : (
                    <div className="empty-message">No items inside shopping cart</div>
                )}
                <Dialog onDismiss={this.close} isOpen={this.state.showDialog}>
                    <p className='title'>{this.state.submissionMessage}</p>
                </Dialog>
            </div>
        )
    }

}

export default ShoppingCart;
