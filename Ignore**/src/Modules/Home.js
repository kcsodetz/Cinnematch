import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from '../logo.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Cinnematch</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/Home.js</code> and save to reload.
        </p>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );
  }
}

export default Home;

