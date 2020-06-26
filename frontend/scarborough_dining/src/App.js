import React, { Component } from 'react';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import AccountCreation from './components/AccountCreation';
//import Restaurant from './components/Restaurant';
import RestaurantList from './components/RestaurantList';
import Unknown from './components/Unknown';

import './App.css';


export class App extends Component {

  state = {
    userType: ''
  }

  changeUserType = (userType) => {
    this.setState({userType: userType})
  }

  render() {
    return (
      <div className="App">
        <head>
          <title>Scarborough Dining | CodeShippers</title>
        </head>
        <Header changeUserType={this.changeUserType} />
        <body>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={RestaurantList} />
              <Route path="/" render={
                () => <AccountCreation userType={this.state.userType} />
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

/*
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header'
import RestaurantList from './components/RestaurantList'
import AccountCreation from './components/AccountCreation';
import Unknown from './components/Unknown';
import logo from './logo.svg';
import './App.css';

setUserType()
function App() {
  let state = {
    userType: ''
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header setUserType={setUserType}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ahheee CodeShippers! (edit app.js under source)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={RestaurantList} />
            <Route path="/" render={() => <AccountCreation userType={state.userType} />} />
            <Route component={Unknown} />
          </Switch>
        </React.Fragment>
        </body>
    </div>
  );
}

export default App;
*/