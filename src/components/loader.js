// loader element;

var RefreshIndicator = require('material-ui/lib/refresh-indicator');
var React = require('react');

var loadStyle = {
  container: {
    marginTop:'15px',
    position: 'relative',
    textAlign: 'center'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

module.exports = React.createClass({
  render:function(){
    return (<div style={loadStyle.container}>
     <RefreshIndicator
       size={40}
       left={10}
       top={0}
       status="loading"
       style={loadStyle.refresh}
     />
   </div>);
  }
});
