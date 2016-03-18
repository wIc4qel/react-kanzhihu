var React = require('react');
var PropTypes = React.PropTypes;
var date = require('date.js');

// material ui.
var AppBar=require('material-ui/lib/app-bar');
var IconButton=require('material-ui/lib/icon-button');
var NavigationArrowForward = require('material-ui/lib/svg-icons/navigation/arrow-forward');
var NavigationArrowBack = require('material-ui/lib/svg-icons/navigation/arrow-back');

// mock appbar in Title
var Appbar = require('material-ui/lib/app-bar');

// css styles.
var _styles = {
  subtitle : {
    fontSize:'10px',
    marginLeft:'10px'
  }
};

var Title = React.createClass({
  leftTouchHandler:function(){
    // 前一天 dir:1 right
    console.log('>>> in right icon tap');
    if(typeof this.props.handlepaginator == 'function'){
      this.props.handlepaginator({
        date : date('yesterday',this.props.title),
        direction : 1
      });
    }
  },
  rightTouchHandler:function(){
    if(typeof this.props.handlepaginator == 'function'){
      this.props.handlepaginator({
        date : date('tomorrow',this.props.title),
        direction : -1
      });
    }
  },
  render: function() {
    console.log('>>> in title render');
    var props = {};
    var day = this.props.title;
    var _today = day.toLocaleDateString() == (new Date).toLocaleDateString();
    var title = _today
    ?<span><span>看知乎</span><span style={_styles.subtitle}>每天三次，为你精选知乎最佳答案</span></span> // use className to use css style.
    :<span>{day.toLocaleDateString()}</span>;
    props.title = title;

    // icon button click event refer : https://github.com/callemall/material-ui/issues/2482
    props.iconElementRight = <IconButton onClick={this.leftTouchHandler}><NavigationArrowForward /></IconButton>;
    // TODO: use event target (iconbutton) to get vars;

    props.showMenuIconButton = true;
    if(!_today){
      props.iconElementLeft = <IconButton onClick={this.rightTouchHandler}><NavigationArrowBack /></IconButton>;
        props.showMenuIconButton = true;
        props.titleStyle={textAlign:'center',fontSize:'20px'}
    }

    //*** old maner **//
    // var day = this.props.title;
    // return (<h1>
    //     {day.toLocaleDateString()==(new Date).toLocaleDateString()
    //      ? '看知乎'
    //      : day.toLocaleDateString()}
    //   </h1>);
    var args = [props];

    return React.createElement(Appbar,...args);
  }

});

module.exports = Title;
