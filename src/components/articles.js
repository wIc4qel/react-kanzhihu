var React = require('react');
var PropTypes = React.PropTypes;
// var Img = require('./img');
var ImageLoader = require('react-imageloader');
var Link = require('react-router').Link;

// mock material ui card componet.

var Card = require('material-ui/lib/card/card');
var CardActions= require('material-ui/lib/card/card-actions');
var CardHeader= require('material-ui/lib/card/card-header');
var CardMedia= require('material-ui/lib/card/card-media');
var CardTitle= require('material-ui/lib/card/card-title');
var FlatButton= require('material-ui/lib/flat-button');
var CardText= require('material-ui/lib/card/card-text');

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
    
    // TODO: use loading gif
    var preloader = function(){
      return <p>加载中</p>;
    };

    return (<div>
        {this.props.items.map(function(item,key){
          // return (<div key={key}>
          //     <ImageLoader src={item.pic} preloader={preloader} key={key}>
          //       加载失败
          //     </ImageLoader>
          //     <p>
          //       <Link to={'/article/'+self.getId(item)}>
          //       {self.realname(item.name).text}
          //       </Link>
          //     </p>
          //     <p>{item.excerpt}</p>
          //   </div>);
          _pubTime = (new Date(parseInt(item.publishtime)*1000)).toLocaleString();
          return (<Card>
            <CardMedia>
              <ImageLoader src={item.pic} preloader={preloader} >加载失败</ImageLoader>
            </CardMedia>
            <CardTitle title={self.realname(item.name).text} subtitle={'发布于：'+_pubTime}>
            </CardTitle>
            <CardText>
              {item.excerpt}
            </CardText>
          </Card>);
        })}
      </div>);
  }


});

module.exports = Articles;
