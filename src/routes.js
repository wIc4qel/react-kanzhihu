var List = require('./pages/list');
var App = require('./pages/app.js');
var Article = require('./pages/article');

module.exports = {
  path : '/',
  component : App,
  indexRoute : {component : List},
  childRoutes : [
    {path : 'article/:id',component:Article}
  ]
};
