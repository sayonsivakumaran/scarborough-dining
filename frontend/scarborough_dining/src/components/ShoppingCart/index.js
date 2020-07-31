import React, { Component } from 'react';

export default class ShoppingCart extends Component {
    
    click = _ => {
        console.log('ffffff');
    }

    render() {
        return (
            <div>
                <button onClick={this.click}>
                    Activate Lasers
                </button>
            </div>
        );
    }
}