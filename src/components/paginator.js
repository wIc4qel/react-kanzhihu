var React = require('react');
var PropTypes = React.PropTypes;
var date = require('date.js');

var Paginator = React.createClass({
  // data dir : 1,right 前一天; -1,left 后一天
  render: function() {
    return (<div>
        <button
          data-date={date('yesterday',this.props.now)}
          data-dir='1'
          onClick={this.props.handlepaginator}
          >前一天</button>
        <button
          data-date={date('tomorrow',this.props.now)}
          data-dir='-1'
          onClick={this.props.handlepaginator}
          >后一天</button>
      </div>);
  }

});

module.exports = Paginator;
