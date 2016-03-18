var React = require('react');
var PropTypes = React.PropTypes;
var request = require('superagent');

var Link = require('react-router').Link;
var AppBar=require('material-ui/lib/app-bar');
var Answers = require('../components/answers');
var Loader = require('../components/loader');
var IconButton=require('material-ui/lib/icon-button');
var NavigationArrowForward = require('material-ui/lib/svg-icons/navigation/arrow-forward');
var NavigationArrowBack = require('material-ui/lib/svg-icons/navigation/arrow-back');

var __base_api = 'http://api.kanzhihu.com/';

var Article = React.createClass({
  componentWillMount: function() {
    var self = this;
    var q = this.props.params.id.split('-').map(function(item,index){
      if(index == 0) return item;
      if(item == '0') return 'yesterday';
      if(item == '1') return 'recent';
      if(item == '100') return 'archive';
    }).join('/');

    //debug
    console.log('>>> in article page; q: ',q);
    request.get(__base_api+'getpostanswers/'+q)
    .end(function(err,ret){
      if(err) return;
      ret = JSON.parse(ret.text);
      if(ret.error) return;
      if(ret.answers){
        // console.log('>>> set state');
        self.setState({answers:ret.answers});
      }
    })
  },
  getInitialState: function() {
    return {
      answers:[]
    };
  },
  render: function() {
    // https://github.com/callemall/material-ui/blob/master/src%2Fenhanced-button.jsx#L45
    return (<div>
        <AppBar
          title='精彩答案'
          iconElementLeft = {<IconButton containerElement={<Link to='/'></Link>}><NavigationArrowBack /></IconButton>}
          titleStyle={{fontSize:'20px'}}
          showMenuIconButton={true}
        />
        {this.state.answers.length > 0
          ?<Answers
            items={this.state.answers}
            subTitle={this.props.params.id.split('-')[1]}
          />
        :<Loader></Loader>}
      </div>);
  }

});

module.exports = Article;
