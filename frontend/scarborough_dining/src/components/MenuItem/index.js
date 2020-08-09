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
            showDialog: false,
            totalSelected: 0,
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
        this.close();
        if (this.state.totalSelected) {
            this.menuItem.total = this.state.totalSelected;
            await axios.post(`/user/add-to-shopping-cart/${this.state.userId}`, this.menuItem);
        }
    }
    
    render() {
        return (
            <Link className="col-md-4 d-flex align-items-stretch text-link" onClick={this.open}>
                <div className="card">
                    <img className="card-img-top" src={this.menuItem.imageURL}/>
                    <div className="card-body"> 
                        <p className="title">{this.menuItem.name}</p>
                        <p className="description">${this.menuItem.price}</p>
                        <p className="description">{this.menuItem.description}</p>
                    </div>
                </div>
                <Dialog onDismiss={this.close} isOpen={this.state.showDialog}>
                    <img className="card-img-top" src={this.menuItem.imageURL}/>
                    <div className="card-body menu-item-modal"> 
                        <p className="title">{this.menuItem.name}</p>
                        <p className="title">${this.menuItem.price}</p>
                        <p className="title">{this.menuItem.description}</p>
                        <input onChange={this.onQuantityChange} name="totalItems" type="number" min="0" step="1" placeholder="Total" required={true} />
                        <input onClick={this.addToShoppingCart} className="add-menu-item-modal-button" name="addMenuItemModalButton" type="submit" value="Add To Shopping Cart"/>
                    </div>
                </Dialog>
            </Link>
        )
    }
}
