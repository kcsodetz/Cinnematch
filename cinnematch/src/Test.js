// import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import logo from './cmlogo.png';
// import Login from './Login';
// import About from './About'
// import Main from './Main'
// import Movies from './Movies';
// import Profile from './Profile'
// import Showtimes from './Showtimes';
// import Discussion from './Discussion'
// import SignOut from './SignOut'
// import Test from './Test'
// import HeaderBar from 'header-bar'
// import base, { auth } from './base'
// import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
// import './App.css';
// import { SIGPIPE } from 'constants';
 
// class Test extends React.Component {
//     render(){ 
//         return(
//             <html>
            
//             <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
//             <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
//             <body>

//             <div class="w3-sidebar w3-bar-block w3-light-grey">
//             <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/movies">Rate Movies</Link>
//         </li>
//         <li>
//           <Link to="/showtimes">Showtimes</Link>
//         </li>
//         <li>
//           <Link to="/discussion">Discussion</Link>
//         </li>
//         <li>
//           <Link to="/test">Test</Link>
//         </li>
//             </div>

//             <div>

//             <div class="w3-container w3-dark-grey">
//             <h1>My Page</h1>
//             </div>

//             <div class="w3-container">
//             <p>When you mouse over the links inside the side navigation, the background color will change to grey by default.</p>
//             <p>If you want a different background color on hover, use any of the w3-hover-color classes.</p>
//             </div>

//             </div>
//             <Switch>
//           <Route path='/about' component={About} />
//           <Route path='/login' component={Login} />
//           <Route path="/profile" render={() => (
//             this.signedIn()
//               ? <Profile
//                   firebaseNotesSynced={this.state.firebaseSynced}
//                   {...actions}
//                 />
//               : <Redirect to="/login" />
//           )} />
//           <Route path="/movies" render={() => (
//             this.signedIn()
//               ? <Movies
//                   firebaseNotesSynced={this.state.firebaseSynced}
//                 />
//               : <Redirect to="/login" />
//           )} />
//           <Route path="/profile" render={() => (
//             this.signedIn()
//               ? <Profile
//                   firebaseNotesSynced={this.state.firebaseSynced}
//                 />
//               : <Redirect to="/login" />
//           )} />
//            <Route path="/showtimes" render={() => (
//             this.signedIn()
//               ? <Showtimes
//                   firebaseNotesSynced={this.state.firebaseSynced}
//                 />
//               : <Redirect to="/login" />
//           )} />
//            <Route path="/discussion" render={() => (
//             this.signedIn()
//               ? <Discussion
//                   firebaseNotesSynced={this.state.firebaseSynced}
//                 />
//               : <Redirect to="/login" />
//           )} />
//           <Route path="/test" render={() => (
//             this.signedIn()
//               ? <Test
//                   firebaseNotesSynced={this.state.firebaseSynced}
//                 />
//               : <Redirect to="/login" />
//           )} />
//            <Route path="/o" render={() => (
//             this.signedIn()
//               ? <SignOut
//                   signout={this.signOut}
//                 />
//               : <Redirect to="/signout" />
//           )} />
//           <Route render={() => <p>To get started, click one of the links above</p>} />
//         </Switch>
//             </body>
//             </html>
//         );
//     }
// }

// export default Test;