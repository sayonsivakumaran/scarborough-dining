import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import AccountCreation from './components/AccountCreation';
import ManageRestaurantInformation from './components/ManageRestaurantInformation';
import LogIn from './components/LogIn';
import GoogleBtn from './components/GoogleBtn';
//import Restaurant from './components/Restaurant';
import RestaurantList from './components/RestaurantList';
import RestaurantProfile from './components/RestaurantProfile';
import Unknown from './components/Unknown';


import './App.css';


export class App extends Component {


  state = {
    id: '',
    accessToken: '',
    isLoggedIn: false
  }

  checkLogin = (data) => {
    this.setState({
      id: data.id,
      accessToken: data.accessToken,
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  render() {
    return (
      <div className="App">
        <head>
          <title>Scarborough Dining | CodeShippers</title>
        </head>
        <body>
          <Header />
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
              <Route path="/login" render={
                () => <LogIn checkLogin={this.checkLogin.bind(this)} /> 
              } />
              <Route path='/manage-restaurant-information' component={ManageRestaurantInformation} />
              <Route component={Unknown} />
            </Switch>
          </React.Fragment>
        </body>
      </div>
    )
  }
}

export default App
