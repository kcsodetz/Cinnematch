import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './cmlogo.png';
import Login from './Login';
import About from './About'
import Main from './Main'
import Movies from './Movies';
import Profile from './Profile'
import Showtimes from './Showtimes';
import Discussion from './Discussion'
import SignOut from './SignOut'
import Test from './Test'
import HeaderBar from 'header-bar'
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
      username: '',
      profilepic: '',
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
      { uid: user.uid, username: user.email, profilepic: user.photoURL},
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

    const actions = {
      uid: this.state.uid,
    }

    return (
      <div className="App">
      <div className="Center">
        <header className="Left">
          <HeaderBar>
            <a href='/home' data-logo={true} data-color='goldenrod'><img src={logo}/></a>
            <a href='/home' data-nav={true} data-color='goldenrod'>Cinnematch</a>
            <div data-submenu_button={true} data-submenu_key='profile'>
                <img src={this.state.profilepic} style={{height: '1.8em', borderRadius: '0.9em'}}/>
                <span title='profile'>{this.state.username.substr(0,this.state.username.indexOf("@"))}</span>
            </div>
            <div data-submenu_button={true} data-submenu_key='settings'><span title='settings'>Settings</span></div>
            <div data-submenu_item={true}  data-submenu_key='profile' data-submenu_position='header'>
                <div style={{color: 'rgb(24, 155, 202)'}}>My Profile</div>
            </div>
            <div data-submenu_item={true}  data-submenu_key='profile' data-submenu_position='body'>
                <a href='/profile' title='User Info'>User Info</a>
            </div>
            <div data-submenu_item={true}  data-submenu_key='settings' data-submenu_position='body'>
                <a href='/change-password' title='User Info'>Change Password</a>
            </div>
            <div data-submenu_item={true}  data-submenu_key='profile' data-submenu_position='footer'>
                <a href='/signout' title='Logout' onClick={this.signOut}>Logout</a>
            </div>
        </HeaderBar>
      
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
          <Link to="/showtimes">Showtimes</Link>
        </li>
        <li className="App-sidebar">
          <Link to="/discussion">Discussion</Link>
        </li>
      </div>
       <Switch>
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path="/profile" render={() => (
            this.signedIn()
              ? <Profile
                  firebaseNotesSynced={this.state.firebaseSynced}
                  {...actions}
                />
              : <Redirect to="/login" />
          )} />
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
           <Route path="/o" render={() => (
            this.signedIn()
              ? <SignOut
                  signout={this.signOut}
                />
              : <Redirect to="/signout" />
          )} />
          <Route render={() => <p>To get started, click one of the links above</p>} />
        </Switch>
      </div>
    );
  }
}

export default App;