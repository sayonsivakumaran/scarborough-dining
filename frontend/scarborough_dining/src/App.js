import React from 'react';
import {Switch, Route} from 'react-router-dom';
import RestaurantList from './components/RestaurantList'
import Unknown from './components/Unknown';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
            <Route component={Unknown} />
          </Switch>
        </React.Fragment>
        </body>
    </div>
  );
}

export default App;
