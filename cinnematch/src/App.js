import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './cmlogo.png';
import Login from './Login';
import About from './About'
import Movies from './Movies';
import Profile from './Profile'
import Showtimes from './Showtimes';
import Discussion from './Discussion'
import SignOut from './SignOut'
import HeaderBar from 'header-bar'
import base, { auth } from './base'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import './App.css';
import { SIGPIPE } from 'constants';

/**
 * Main Application 
 */
class App extends Component {
  /**
   * Default constructor
   * @constructor
   */
  constructor() {
    super();
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
    auth.signOut();
  }

  unauthHandler = () => {
    this.setState({
      notes: {},
      uid: null,
    })
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid);
    this.setState(
      { uid: user.uid, username: user.email, profilepic: user.photoURL },
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
      <html>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <body>
          <div className="App">
            <div >
              <header className="Left">
                <HeaderBar>
                  {/* <a href='/home' data-logo={true} data-color='goldenrod'><img src={logo}/></a> */}
                  <a href='/home' data-nav={true} data-color='rgb(218, 165, 32)'>Cinnematch</a>

                  {this.state.uid != null ?
                    <div data-submenu_button={true} data-submenu_key='profile'>
                      <img src={this.state.profilepic} style={{ height: '1.8em', borderRadius: '0.9em' }} />
                      <span title='profile'>{this.state.username.substr(0, this.state.username.indexOf("@"))}</span>
                    </div> :
                    <div data-button={true}>
                      <span title='profile'><Link to="/login">Login</Link></span>
                    </div>
                  }

                  <div data-submenu_button={true} data-submenu_key='settings'><span title='settings'>Settings</span></div>
                  <div data-submenu_item={true} data-submenu_key='profile' data-submenu_position='header'>
                    <div style={{ color: 'rgb(218, 165, 32)' }}>My Profile</div>
                  </div>
                  <div data-submenu_item={true} data-submenu_key='profile' data-submenu_position='body'>
                    <a href='/profile' title='User Info'>User Info</a>
                  </div>
                  <div data-submenu_item={true} data-submenu_key='settings' data-submenu_position='body'>
                    <a href='/change-password' title='User Info'>Change Username</a>
                  </div>
                  <div data-submenu_item={true} data-submenu_key='profile' data-submenu_position='footer'>
                    <a href='/signout' title='Logout' onClick={this.signOut}>Logout</a>
                  </div>
                </HeaderBar>
              </header>

              <div class="w3-sidebar w3-bar-block w3-light-grey">

                <Link to="/about"><a href="#" class="w3-bar-item w3-button w3-hover-goldenrod">About</a></Link>

                <Link to="/movies"><a href="#" class="w3-bar-item w3-button w3-hover-goldenrod">Rate Movies</a></Link>

                <Link to="/showtimes"><a href="#" class="w3-bar-item w3-button w3-hover-goldenrod">Showtimes</a></Link>

                <Link to="/discussion"><a href="#" class="w3-bar-item w3-button w3-hover-goldenrod">Discussion</a></Link>
              </div>
              <div>
                <div class="w3-container">
                </div>
              </div>
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
                    {...actions}
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
              <Route render={() =>
                <div><header className="w3-container w3-goldenrod">
                  <h1 className="Center">Home</h1>
                </header>
                  <p className="Center">To get started, click one of the links above</p></div>} />
            </Switch>
          </div>
        </body>
      </html>
    );
  }
}

export default App;