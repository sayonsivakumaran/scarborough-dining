import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/index';
import AccountCreation from './components/AccountCreation';
import ManageRestaurantInformation from './components/ManageRestaurantInformation';
import ShoppingCart from './components/ShoppingCart';
import RestaurantList from './components/RestaurantList';
import RestaurantProfile from './components/RestaurantProfile';
import Unknown from './components/Unknown';
import RestaurantVerfication from './components/RestaurantVerification';

import './App.css';

export class App extends Component {


  state = {
    id: '',
    accessToken: '',
    isLoggedIn: false,
    shoppingCart: {}
  }

  checkLogin = (data) => {
    this.setState({
      id: data.id,
      accessToken: data.accessToken,
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  addToShoppingCart = (menuItems, total) => {
    menuItems.total = total;
    let {shoppingCart} = this.state;
    shoppingCart[menuItems._id] = menuItems;
    this.setState({
      shoppingCart: shoppingCart
    });
  }

  render() {
    return (
      <div className="App">
        <head>
          <title>Scarborough Dining | CodeShippers</title>
        </head>
        <body>
          
          <Header checkLogin={this.checkLogin.bind(this)}/>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={RestaurantList} />
              <Route path="/account-creation/user" render={
                () => <AccountCreation userType={"user"} />
              } />
              <Route path="/account-creation/restaurant" render={
                () => <AccountCreation userType={"restaurant"} />
              } />
              <Route path="/restaurants/:id" component={(props) => <RestaurantProfile {...props} loggedIn={this.state.isLoggedIn} onUpdateShoppingCart={this.addToShoppingCart}/>} />
              <Route path="/restaurants/:id/menu-item/:menuItemId" component={RestaurantProfile} />
              <Route path='/manage-restaurant-information' component={ManageRestaurantInformation} />
              <Route path='/shopping-cart' component={ShoppingCart} />
              <Route path='/manage-restaurants' component={RestaurantVerfication} />
              <Route component={Unknown} />
            </Switch>
          </React.Fragment>
        </body>
      </div>
    )
  }
}

export default App
