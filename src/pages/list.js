//******* List view *******//

var React = require('react');
var PropTypes = React.PropTypes;
var request = require('superagent');

var Title = require('../components/title');
var Articles = require('../components/articles');
var Paginator = require('../components/paginator');

var __base_api = 'http://api.kanzhihu.com/';

var List = React.createClass({
  componentWillMount: function() {
    var self = this;
    request.get(__base_api+'getposts')
    .end(function(err,ret){
      // TODO err handle;
      if(err) return console.log(err);
      // console.log(ret.text);

      ret = JSON.parse(ret.text);
      if(ret.error) return console.log(ret.error); // TODO
      if(ret.posts && ret.posts.length > 0){
        var articles = ret.posts.filter(function(post){
          return (new Date(post.date)).toLocaleDateString()
          == self.state._day.toLocaleDateString();
        });
        self.setState({
          _cache : ret.posts,
          articles : articles,
          _newest : ret.posts[0].publishtime,
          _oldest : ret.posts[ret.posts.length-1].publishtime,
          _cursor: articles.length
        });
      }else{
        //TODO
      }
    })
  },
  getInitialState: function() {
    return {
      _cache:[],
      articles:[],
      _day:new Date(),
      _newest:null,
      _oldest:null,
      _cursor:0
    };
  },
  fetchPosts : function(timestamp,callback){
    if(!callback){
      callback = timestamp;
      timestamp = '';
    }
    // timestamp = timestamp || '';
    var url = __base_api+'getposts/'+timestamp;
    request.get(url)
    .end(function(err,ret){
      if(err) return callback(err);

      ret = JSON.parse(ret.text);
      if(ret.error) return callback(new Error(ret.error));
      // if(ret.posts && ret.posts.length > 0){
      //   var articles = ret.posts.filter(function(post){
      //     return (new Date(post.date)).toLocaleDateString()
      //     == self.state._day.toLocaleDateString();
      //   });
      //   self.setState({
      //     _cache : ret.posts,
      //     articles : articles,
      //     _newest : ret.posts[0].publishtime,
      //     _oldest : ret.posts[ret.posts.length-1].publishtime,
      //     _cursor: articles.length
      //   });
      // }else{
      //   //TODO
      // }
      return callback(null,ret.posts);
    })
  },
  handlePaginator : function(evt){
    var self = this;
    // var direction = parseInt(evt.currentTarget.dataset.dir);
    // var day = evt.currentTarget.dataset.date;

    var direction = evt.direction;
    var day = evt.date;
    var articles = this.state._cache.filter(function(post){
      return (new Date(post.date)).toLocaleDateString()
      == day.toLocaleDateString();
    });
    // cursor
    var tmp = articles.length;
    if(direction == -1) tmp = this.state.articles.length;
    var cursor = this.state._cursor + direction*(tmp);

    if(cursor == this.state._cache.length){
      this.fetchPosts(this.state._oldest,function(err,posts){
        if(err) return console.log(err) //TODO
        articles = articles.concat(posts.filter(function(p){
          return (new Date(p.date)).toLocaleDateString()
          == day.toLocaleDateString();
        }));
        cursor = cursor+direction*(articles.length-tmp);
        self.setState({
          _cache : self.state._cache.concat(posts),
          articles : articles,
          _oldest : posts[posts.length-1].publishtime,
          _cursor : cursor,
          _day : day
        });
      });
    }else{
      this.setState({
        articles : articles,
        _cursor : cursor,
        _day : day
      });
    }
  },

  render: function() {
    // mock appbar in my title component
    //
    return (<div>
        <Title title={this.state._day} handlepaginator={this.handlePaginator}/>
        <Articles items={this.state.articles} />
        {/*<Paginator now={this.state._day} handlepaginator={this.handlePaginator} />*/}
      </div>);
  }

});

//***** exports *****//
module.exports = List;
