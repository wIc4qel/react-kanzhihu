var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var ArticleTitle = React.createClass({
  gettitle:function(title){
    return title.split('-').join(' ');
  },
  render: function() {
    return (<div>
        <Link to='/'> 首页 </Link>
        <span>{this.gettitle(this.props.title)}</span>
      </div>);
  }
});

module.exports = ArticleTitle;
