import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import axios from 'axios';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);

        this.menuItem = this.props.menuItem;
        
        this.state = {
            showDialog: false,
            totalSelected: 0,
            userId: ''
        }
    }

    componentDidMount() {
        this.setState({
            userId: this.props.userId
        });
    }

    open = _ => this.setState({ showDialog: true });

    close = _ => {
        this.setState({
            showDialog: false,
            totalSelected: 0
        });
    }

    onQuantityChange = e => {
        e.preventDefault();
        this.setState({
            totalSelected: Number(e.target.value) || 0
        });
    }

    addToShoppingCart = async e => {
        if (this.state.totalSelected) {
            this.menuItem.total = this.state.totalSelected;
            await axios.post(`/user/add-to-shopping-cart/${this.state.userId}`, this.menuItem)
                .then(_ => this.close())
                .catch(e => e);
        }
    }
    
    render() {
        return (
            <Link className="col-md-4 d-flex align-items-stretch text-link menu" onClick={this.open}>
                <div className="card">
                    <img className="card-img-top" src={this.menuItem.imageURL}/>
                    <div className="card-body"> 
                        <p className="title"><b>{this.menuItem.name}</b></p>
                        <p className="description">$ {this.menuItem.price}</p>
                        <ul class="list-group list-group-flush">
                            <li className="list-group-item"><p className="description">{this.menuItem.description}</p></li>
                            <li className="list-group-item">
                                <p className="categories">
                                    {
                                        this.menuItem.cuisineTypes.map(cuisine => {
                                        return <span className="category">{cuisine}</span>
                                        })
                                    }
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <Dialog className="menu-item-modal" onDismiss={this.close} isOpen={this.state.showDialog}>
                    {this.state.userId ? (
                        <React.Fragment>
                            <img className="card-img-top" src={this.menuItem.imageURL}/>
                            <div className="card-body menu-item-modal"> 
                                <p className="title"><b>{this.menuItem.name}</b></p>
                                <p className="title">$ {this.menuItem.price}</p>
                                <p className="title">{this.menuItem.description}</p>
                                <div className="d-flex justify-content-center">
                                    <input onChange={this.onQuantityChange} class="form-control menu-item-quantity-input" name="totalItems" type="number" min="0" step="1" placeholder="Total" required={true} />
                                </div>
                                <input onClick={this.addToShoppingCart} className="bg-primary btn btn-primary add-menu-item-modal-button" name="addMenuItemModalButton" type="submit" value="Add To Shopping Cart"/>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p className="title">Please log in to your Scarborough Dining Account</p>
                            <Link to='../../login'>
                                <input className="bg-danger btn btn-primary add-menu-item-modal-button" name="addMenuItemModalButton" type="submit" value="Log In"/>
                            </Link>
                        </React.Fragment>
                    )}
                </Dialog>
            </Link>
        )
    }
}
