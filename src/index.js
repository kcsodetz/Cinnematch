import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Modules/Home';
import About from './Modules/About'
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render( 
    <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();