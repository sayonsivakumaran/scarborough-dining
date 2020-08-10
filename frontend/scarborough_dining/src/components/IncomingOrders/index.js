import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
    
class IncomingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderRequests: [],
            totalOrders: 0,
            restaurantID: '',
            submissionMessage: '',
            showDialog: false
        };
    }

    async componentDidMount() {
        let restaurantID = this.props.restaurantId;
        this.setState({
            restaurantID: restaurantID
        });
        await axios.get(`/restaurants/getOrderRequests/` + restaurantID)
            .then(res => this.setState({
                orderRequests: res.data,
                totalOrders: res.data.length
            }))
            .catch(err => err);
    }
    
    _removeOrder = async (removeIndex) => {
        axios.post(`/restaurants/deletePendingOrder/${this.state.restaurantID}/${removeIndex}`)
            .then(res => this.setState({
                orderRequests: res.data,
                totalOrders: res.data.length
            }))
            .catch(err => err);
    }

    _getOrderRequestTablesByRequest = (orderRequests, removeIndex) => {
        let orderTables = [];
        for (let i = 0, l = orderRequests.length; i < l; i++) {
            let id = orderRequests[i].menuItemID;
            orderTables.push(
                <tr className="pending-order-row" key={id}>
                    <td><img className="pending-order-image" src={orderRequests[i].imageURL}/></td>
                    <td>{orderRequests[i].name}</td>
                    <td>${orderRequests[i].price}</td>
                    <td>{orderRequests[i].total}</td>
                    <td>${(orderRequests[i].total * orderRequests[i].price).toFixed(2)}</td>
                </tr>
            )
        }
            
        return (
            <React.Fragment>
                <h4>{'s'}</h4>
                <table className="table table-responsive table-hover">
                    <thead class="table-header">
                        <tr className="t-header">
                            <th scope="col">Item Image</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Total Items</th>
                            <th scope="col">Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderTables}
                    </tbody>
                </table>
                <input 
                    onClick={() => this._removeOrder(removeIndex)} 
                    className="submit-shopping-cart-modal-button btn btn-primary mb-4 mr-2" 
                    name="submitShoppingCart" 
                    type="submit" 
                    value="Accept Order"/>
                <input 
                    onClick={() => this._removeOrder(removeIndex)} 
                    className="submit-shopping-cart-modal-button btn btn-danger mb-4" 
                    name="submitShoppingCart" 
                    type="submit" 
                    value="Reject Order"/>
            </React.Fragment>
        );
    }

    _getOrderRequestTables = orderRequests => {
        // let orderRequestMap = {};

        // for (let i = 0; i < orderRequests.length; i++) {
        //     let userGoogleID = orderRequests[i].userGoogleID;
        //     if (!orderRequestMap[userGoogleID]) {
        //         orderRequestMap[userGoogleID] = [];
        //     }

        //     orderRequestMap[userGoogleID] = orderRequestMap[userGoogleID].concat([orderRequests[i]]);
        // }
        
        // let orderRequestsTableArray = [];
        // Object.keys(orderRequestMap).forEach(userGoogleID => {
        //     orderRequestsTableArray.push(this._getShoppingCartItemsForRestaurant(orderRequestMap[userGoogleID], restaurantID));
        // });

        let orderRequestsTableArray = orderRequests.map((request, i) => this._getOrderRequestTablesByRequest(request, i));

        return orderRequestsTableArray;
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

    render() {
        return (
            <div class="shoppingCartPage">
                <h2>Order Requests</h2>
                {this.state.totalOrders > 0 ? (
                    <React.Fragment>
                        <h3 className="total">{this.state.totalOrders} Total Order{this.state.totalOrders != 1 ? 's':''}</h3>
                        {this._getOrderRequestTables(this.state.orderRequests)}
                    </React.Fragment>
                ) : (
                    <div className="empty-message">No items inside shopping cart</div>
                )}
                <Dialog className="shopping-cart-modal" onDismiss={this.close} isOpen={this.state.showDialog}>
                    <p className='title'>{this.state.submissionMessage}</p>
                    <Link to='../'>
                        <input className="bg-danger btn btn-primary add-menu-item-modal-button" name="addMenuItemModalButton" type="submit" value="Home"/>
                    </Link>
                </Dialog>
            </div>
        )
    }

}

export default IncomingOrders;
