var React = require('react');
var PropTypes = React.PropTypes;
// var Img = require('./img');
var ImageLoader = require('react-imageloader');
var Link = require('react-router').Link;

var Articles = React.createClass({
  realname:function(name){
    if(name=='yesterday') return {text:'昨日最新',code:0};
    if(name=='archive') return {text:'历史精华',code:100};
    if(name=='recent') return {text:'今日热门',code:1};
    return {};
  },
  getId : function(item){
    return [item.date.replace(/-/g,''),
    this.realname(item.name).code].join('-');
  },
  render: function() {
    var self = this;
    var preloader = function(){
      return <p>加载中</p>;
    };

    return (<div>
        {this.props.items.map(function(item,key){
          return (<div key={key}>
              <ImageLoader src={item.pic} preloader={preloader} key={key}>
                加载失败
              </ImageLoader>
              <p>
                <Link to={'/article/'+self.getId(item)}>
                {self.realname(item.name).text}
                </Link>
              </p>
              <p>{item.excerpt}</p>
            </div>);
        })}
      </div>);
  }


});

module.exports = Articles;
