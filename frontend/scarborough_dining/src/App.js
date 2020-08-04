import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/index';
import AccountCreation from './components/AccountCreation';
import ManageRestaurantInformation from './components/ManageRestaurantInformation';
import RestaurantList from './components/RestaurantList';
import RestaurantProfile from './components/RestaurantProfile';
import Unknown from './components/Unknown';
import RestaurantVerfication from './components/RestaurantVerification';
import LogIn from './components/LogIn'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

import './App.css';

export class App extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount() {
    axios.get('/auth/login/success')
      .then(results => this.setState({
        loggedIn: results.data.success,
        displayName: results.data.user.displayName,
        restaurantId: results.data.user.restaurantId,
        ratings: results.data.user.ratings,
        favourites: results.data.user.favourites,
        admin: results.data.user.admin
      })
    )
  }

  render() {
    return (
      <div className="App">
        <head>
          <title>Scarborough Dining | CodeShippers</title>
        </head>
        <body>
          
          <Header/>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={RestaurantList} />
              <Route path="/account-creation/user" render={
                () => <AccountCreation userType={"user"} />
              } />
              <Route path="/account-creation/restaurant" render={
                () => <AccountCreation userType={"restaurant"} />
              } />
              <Route path="/restaurants/:id" component={RestaurantProfile} />
              <Route path='/manage-restaurant-information' component={ManageRestaurantInformation} />
              <Route path='/manage-restaurants' component={RestaurantVerfication} />
              <Route path='/login/fail' render={
                () => <LogIn fail={true} />
              }  />
              <Route path='/login' component={LogIn} />
              <Route path='/register/fail' render={
                () => <Register fail={true} />
              } />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={Dashboard} />
              <Route component={Unknown} />
            </Switch>
          </React.Fragment>
        </body>
      </div>
    )
  }
}

export default App
