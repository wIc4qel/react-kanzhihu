var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;

var routes = require('./routes');
ReactDOM.render(
  <Router histroy={hashHistory} routes={routes} />,
  document.getElementById('app')
);
