import React, { Component } from 'react';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import AccountCreation from './components/AccountCreation';
//import Restaurant from './components/Restaurant';
import RestaurantList from './components/RestaurantList';
import Unknown from './components/Unknown';

import './App.css';


export class App extends Component {

  render() {
    return (
      <div className="App">
        <head>
          <title>Scarborough Dining | CodeShippers</title>
        </head>
        <Header />
        <body>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={RestaurantList} />
              <Route path="/account-creation/user" render={
                () => <AccountCreation userType={"user"} />
              } />
              <Route path="/account-creation/restaurant" render={
                () => <AccountCreation userType={"restaurant"} />
              } />
              <Route component={Unknown} />
            </Switch>
          </React.Fragment>
        </body>
      </div>
    )
  }
}

export default App
