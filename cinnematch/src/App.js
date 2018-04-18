import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import Login from './Login';
import About from './About'
import { Switch, Route, NavLink } from 'react-router-dom'
import './App.css';

class Home extends Component {

  render() {
    return (
      <div className="App">
      <div className="Home">
        <header className="App-header">
          <h1 className="App-title">Cinnematch</h1>
        </header>
        <li className="App-sidebar">
          <Link to="/about">About</Link>
        </li>
        <li className="App-sidebar">
          <Link to="/login">Login</Link>
        </li>
      </div>
       <Switch>
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route render={() => <p>To get started, click one of the links above</p>} />
        </Switch>
      </div>
    );
  }
}

export default Home;