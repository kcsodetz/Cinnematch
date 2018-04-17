import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, hashHistory } from 'react-router';
import Home from './Modules/Home';
import About from './Modules/About';
import Login from './Modules/Login'

ReactDOM.render( 
    <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/login" component={Login}/>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();