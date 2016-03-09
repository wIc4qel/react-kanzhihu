var React = require('react');
// var PropTypes = React.PropTypes;
var getMuiTheme= require('material-ui/lib/styles/getMuiTheme');
var MuiThemeProvider=require('material-ui/lib/MuiThemeProvider');
var colors = require('material-ui/lib/styles/colors');

// mock with material-ui theme;
// in the app component
var App = React.createClass({

  render: function() {
    var muiTheme = getMuiTheme({
      palette:{
        primary1Color : colors.indigo500 // low case
      }
    });

    console.log('>>> primary color: ', colors.indigo500);
    return (<MuiThemeProvider muiTheme={muiTheme}><div>
      {this.props.children}
      </div></MuiThemeProvider>);
  }

});

module.exports = App;
