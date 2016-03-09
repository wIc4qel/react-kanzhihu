var React = require('react');
var PropTypes = React.PropTypes;
var request = require('superagent');

var ArticleTitle = require('../components/articletitle');
var Answers = require('../components/answers');

var __base_api = 'http://api.kanzhihu.com/';

var Article = React.createClass({
  componentWillMount: function() {
    var self = this;
    var q = this.props.params.id.split('-').map(function(item,index){
      if(index==0) return item;
      switch (item) {
        case '0':
          return 'yesterday';
          break;
        case '1':
          return 'recent';
          break;
        case '100':
          return 'archive';
          break;
        default:
      }
    }).join('/');
    //debug
    console.log(q);
    request.get(__base_api+'getpostanswers/'+q)
    .end(function(err,ret){
      if(err) return;
      ret = JSON.parse(ret.text);
      if(ret.error) return;
      if(ret.answers){
        console.log('>>> set state');
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
    return (<div>
        <ArticleTitle title={this.props.params.id} />
        <Answers items={this.state.answers} />
      </div>);
  }

});

module.exports = Article;
