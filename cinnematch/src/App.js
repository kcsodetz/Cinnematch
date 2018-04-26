import React, { Component } from 'react';
import logo from './cinnematch logo 2.png';
import logo2 from './cinnematch logo.png';
import Login from './Login';
import About from './About'
import Movies from './Movies';
import Profile from './Profile'
import InTheaters from './InTheaters';
import Discussion from './Discussion'
import SignOut from './SignOut'
import HeaderBar from 'header-bar'
import base, { auth } from './base'
import { Link, Switch, Route, NavLink, Redirect } from 'react-router-dom'
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
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <div>
          <div className="App">
            <div id="testPosition">
              <header className="Left" >
                <HeaderBar>
                <a href='/home' data-nav={true}><img src={logo} style={{height:40}}/></a>

                  <a href='/home' data-nav={true} data-color='rgb(218, 165, 32)'>Cinnematch</a>

                  {this.signedIn() ?
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
                    <a href='/profile' title='User Info'>My Movies</a>
                  </div>
                  <div data-submenu_item={true} data-submenu_key='profile' data-submenu_position='body'>
                    <a href='/profile' title='User Info'>User Info</a>
                  </div>
                  <div data-submenu_item={true} data-submenu_key='settings' data-submenu_position='body'>
                    <a href='/change-username' title='User Info'>Change Username</a>
                  </div>
                  <div data-submenu_item={true} data-submenu_key='profile' data-submenu_position='body'>
                    <a href='/signout' title='Logout' onClick={this.signOut}>Logout</a>
                  </div>
                </HeaderBar>
              </header>
              {this.signedIn() ?
              <div className="w3-sidebar w3-bar-block w3-light-grey">
              <img src={this.state.profilepic} style={{ height: '13.4em', borderRadius: '0.9em' }} />

                <Link to="/about"><p href="#" className="w3-bar-item w3-button w3-hover-goldenrod">About</p></Link>

                <Link to="/movies"><p href="#" className="w3-bar-item w3-button w3-hover-goldenrod">Rate Movies</p></Link>

                <Link to="/intheaters"><p href="#" className="w3-bar-item w3-button w3-hover-goldenrod">In Theaters</p></Link>
              </div>
              
              :<div className="w3-sidebar w3-bar-block w3-light-grey">

                <Link to="/about"><p href="#" className="w3-bar-item w3-button w3-hover-goldenrod">About</p></Link>


              </div>

              }
              
            </div>
            <Switch>
              <Route path='/about' component={About} />
              <Route path='/login' render = { () => (
              this.signedIn() ?
              <div>
                <header className="w3-container w3-goldenrod">
                  <h1 className="Center" id="ProfileBar">Home</h1>
                </header>
                <Redirect to="/home" /></div> :
              <Login/>
              )} />
              <Route path="/profile" render={() => (
                this.signedIn()
                  ? <Profile
                    firebaseNotesSynced={this.state.firebaseSynced}
                    {...actions}
                  />
                  : <Redirect to="/home" />
              )} />
              <Route path="/movies" render={() => (
                this.signedIn()
                  ? <Movies
                    firebaseNotesSynced={this.state.firebaseSynced}
                    {...actions}
                  />
                  : <Redirect to="/home" />
              )} />
              <Route path="/profile" render={() => (
                this.signedIn()
                  ? <Profile
                    firebaseNotesSynced={this.state.firebaseSynced}
                  />
                  : <Redirect to="/home" />
              )} />
              <Route path="/intheaters" render={() => (
                this.signedIn()
                  ? <InTheaters
                    firebaseNotesSynced={this.state.firebaseSynced}
                  />
                  : <Redirect to="/home" />
              )} />
              <Route path="/discussion" render={() => (
                this.signedIn()
                  ? <Discussion
                    firebaseNotesSynced={this.state.firebaseSynced}
                  />
                  : <Redirect to="/home" />
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
                  <h1 className="Center" style={{ color: 'rgb(255, 255, 255)' }} >Home</h1>
                </header>
                {this.signedIn() ? 
                  <h1 className="LeftAdjustedMargin">Welcome {this.state.username.substr(0, this.state.username.indexOf("@"))}! </h1> :
                  <h1 className="LeftAdjustedMargin">Login to get started!</h1>
                }
                <p className="LeftAdjustedMargin"><img src={logo2} style={{height:500}}/></p>
                  </div>} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;