import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import Login from './Login';
import About from './About'
import Main from './Main'
import Movies from './Movies';
import Profile from './Profile'
import Showtimes from './Showtimes';
import Discussion from './Discussion'
import Logout from './SignOut'
import base, { auth } from './base'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import './App.css';
import { SIGPIPE } from 'constants';

class App extends Component {

  constructor(){
    super()
    
    this.state = {
      profile: {},
      uid: null,
      firebaseSynced: false,
    }

  }

  componentWillMount() {
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          this.authHandler(user)
        } else {
          // finished signing out
          this.unauthHandler()
        }
      }
    )
  }

  signOut = () => {
    auth.signOut()
  }

  unauthHandler = () => {
    this.setState({
      notes: {},
      uid: null,
    })
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
  }

  signedIn = () => {
    return this.state.uid
  }

  render() {
    return (
      <div className="App">
      <div className="Center">
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
          <Link to="/logout">Sign Out</Link>
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
          <Route path="/movies" render={() => (
            this.signedIn()
              ? <Movies
                  firebaseNotesSynced={this.state.firebaseSynced}
                />
              : <Redirect to="/login" />
          )} />
          <Route path="/profile" render={() => (
            this.signedIn()
              ? <Profile
                  firebaseNotesSynced={this.state.firebaseSynced}
                />
              : <Redirect to="/login" />
          )} />
           <Route path="/showtimes" render={() => (
            this.signedIn()
              ? <Showtimes
                  firebaseNotesSynced={this.state.firebaseSynced}
                />
              : <Redirect to="/login" />
          )} />
           <Route path="/discussion" render={() => (
            this.signedIn()
              ? <Discussion
                  firebaseNotesSynced={this.state.firebaseSynced}
                />
              : <Redirect to="/login" />
          )} />
           <Route path="/logout" render={() => (
            !this.signedIn()
              ? <Logout
                  firebaseNotesSynced={this.state.firebaseSynced}
                />
              : <Redirect to="/logout" />
          )} />
          <Route render={() => <p>To get started, click one of the links above</p>} />
        </Switch>
      </div>
    );
  }
}

export default App;