import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/index';
import AccountCreation from './components/AccountCreation';
import ManageRestaurantInformation from './components/ManageRestaurantInformation';
import ShoppingCart from './components/ShoppingCart';
import ManageAnnouncements from './components/ManageAnnouncements';
import RestaurantList from './components/RestaurantList';
import RestaurantProfile from './components/RestaurantProfile';
import Unknown from './components/Unknown';
import RestaurantVerfication from './components/RestaurantVerification';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CommunityDiscussionBoard from './components/CommunityDiscussionBoard';

import './App.css';

export class App extends Component {


  state = {
    loggedIn: false,
    id: '',
    firstName: '',
    lastName: '',
    restaurantId: undefined,
    ratings: undefined,
    favourites: undefined,
    admin: false,
    shoppingCart: {}
  }

  // On load of page or component, check to see if user is logged in. Then retrieve user information
  async componentDidMount() {
    await axios.get('/auth/login/success')
      .then(results => this.setState({
        loggedIn: true,
        id: results.data.user.googleId
      }))
      .catch(err => this.setState({
            loggedIn: false
      }));

    if (this.state.loggedIn) {
      await axios.get(`/user/${this.state.id}`)
        .then(results => this.setState({
          firstName: results.data.firstName,
          lastName: results.data.lastName,
          address: results.data.address,	
          city: results.data.city,	
          postalCode: results.data.postalCode,	
          province: results.data.province,
          restaurantId: results.data.restaurantId
        }));
    }
  }

  addToShoppingCart = (menuItems, total) => {
    menuItems.total = total;
    let {shoppingCart} = this.state;
    shoppingCart[menuItems._id] = menuItems;
    this.setState({
      shoppingCart: shoppingCart
    });
  }

  deleteItemFromShoppingCart = (menuItemID) => {
    let {shoppingCart} = this.state;

    delete shoppingCart[menuItemID];
    this.setState({
      shoppingCart: shoppingCart
    });
  }

  orderAll = _ => {
    this.setState({
      shoppingCart: {}
    });
  }

  render() {
    return (
      <div className="App pages">
        <head>
          <title>Scarborough Dining | CodeShippers</title>
        </head>
        <body>
          <Header/>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={RestaurantList} />
              <Route path="/account-creation/restaurant" render={() => <AccountCreation userType={"restaurant"} id={this.state.id}/>}/>
              <Route path="/restaurants/:id" component={(props) => <RestaurantProfile {...props} loggedIn={this.state.loggedIn} userId={this.state.id}/>} />
              <Route path="/restaurants/:id/menu-item/:menuItemId" component={RestaurantProfile} />
              <Route path='/shopping-cart' component={(props) => <ShoppingCart {...props} userGoogleId={this.state.id} loggedIn={this.state.loggedIn} shoppingCart={this.state.shoppingCart}/>} onOrderAll={this.orderAll} onDeleteItemFromShoppingCart={this.deleteItemFromShoppingCart}/>
              <Route exact path='/manage-restaurant-information/general' component={ManageRestaurantInformation} />
              <Route path='/manage-restaurant-information/announcements' render={() => <ManageAnnouncements isManager={true}/>} />
              <Route path='/manage-restaurants' component={RestaurantVerfication} />

              <Route path='/login/fail' render={() => <LogIn fail={true}/>}/>
              <Route path='/login' component={LogIn} />
              <Route path='/register/fail' render={() => <Register fail={true}/>}/>
              <Route path='/register' component={Register}/>

              <Route path='/dashboard' component={Dashboard} />
              <Route path='/account-information' render={() => <AccountCreation userType={"user"}/>}/>
              <Route path='/discussion-board' component={CommunityDiscussionBoard}/>
              <Route component={Unknown} />
            </Switch>
          </React.Fragment>
        </body>
      </div>
    )
  }
}

export default App