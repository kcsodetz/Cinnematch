import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import Login from './Login';
import About from './About'
import Movies from './Movies';
import Profile from './Profile'
import Showtimes from './Showtimes';
import Discussion from './Discussion'
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
        <li className="App-sidebar">
          <Link to="/movies">Rate Movies</Link>
        </li>
        <li className="App-sidebar">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="App-sidebar">
          <Link to="/showtimes">Showtimes</Link>
        </li>
        <li className="App-sidebar">
          <Link to="/discussion">Discussion</Link>
        </li>
      </div>
       <Switch>
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/movies' component={Movies} />
          <Route path='/profile' component={Profile} />
          <Route path='/showtimes' component={Showtimes} />
          <Route path='/discussion' component={Discussion} />
          <Route render={() => <p>To get started, click one of the links above</p>} />
        </Switch>
      </div>
    );
  }
}

export default Home;