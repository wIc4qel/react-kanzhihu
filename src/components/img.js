/**  img loader (by zhqy) **/

/* 1.error alterative
 * 2.preloader
 * 3.anti-hotlink (use cache)
 */

var React = require('react');
var PropTypes = React.PropTypes;

var Img = React.createClass({
  getDefaultProps: function() {
    return {wrapper : React.DOM.div};
  },
  // get img to render
  renderImg : function(){
    var props = this.props.imgProps || {};
    props.src = this.props.src;
    return <img {...props} />;
  },
  getInitialState: function() {
    return {
      _state:0
    };
  },
  componentDidMount: function() {
    var self = this;
    this.loader = new Image();
    this.loader.onload = function(){
      self.setState({_state:1});
    };
    this.loader.onerror = function(){
      self.setState({_state:-1});
    }
    this.loader.src = this.props.src;
  },
  render: function() {
    var wrapperProps = {
      className : '__antihotlink'
    };
    if(this.props.className) {
      wrapperProps.className = wrapperProps.className+' '+this.props.className;
    }
    if(this.props.style) wrapperProps.style = this.props.style;
    var wrapperArgs = [wrapperProps];

    switch (this.state._state) {
      case 1:
        wrapperArgs.push(this.renderImg());
        break;
      case -1:
        if(this.props.children){
          wrapperArgs.push(this.props.children);
        }
        break;
      default:
        if(this.props.preloader){
          wrapperArgs.push(this.props.preloader);
        }
    };
    return this.props.wrapper(...wrapperArgs); // ... meaning ?
  }

});

module.exports = Img;
