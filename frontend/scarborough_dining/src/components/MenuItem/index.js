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
        
        if (this.props.menuItem) {
            this.state = {
                name: this.props.menuItem.name,
                price: this.props.menuItem.price,
                imageURL: this.props.menuItem.imageURL,
                description: this.props.menuItem.description,
                id: this.props.menuItem._id,
                restaurantId: this.props.menuItem.restaurantID,
                showDialog: false,
                totalSelected: 0,
                userId: this.props.userId
            }
        }
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
        this.close();
        if (this.state.totalSelected) {
            this.menuItem.total = this.state.totalSelected;
            await axios.post(`/user/add-to-shopping-cart/${this.state.userId}`, this.menuItem);
        }
    }
    
    render() {
        return (
            <Link className="text-link" onClick={this.open}>
                <div className="card">
                    <img className="card-img-top" src={this.state.imageURL}/>
                    <div className="card-body"> 
                        <p className="title">{this.state.name}</p>
                        <p className="description">${this.state.price}</p>
                        <p className="description">{this.state.description}</p>
                    </div>
                </div>
                <Dialog onDismiss={this.close} isOpen={this.state.showDialog}>
                    <img className="card-img-top" src={this.state.imageURL}/>
                    <div className="card-body menu-item-modal"> 
                        <p className="title">{this.state.name}</p>
                        <p className="title">${this.state.price}</p>
                        <p className="title">{this.state.description}</p>
                        <input onChange={this.onQuantityChange} name="totalItems" type="number" min="0" step="1" placeholder="Total" required={true} />
                        <input onClick={this.addToShoppingCart} className="add-menu-item-modal-button" name="addMenuItemModalButton" type="submit" value="Add To Shopping Cart"/>
                    </div>
                </Dialog>
            </Link>
        )
    }
}
