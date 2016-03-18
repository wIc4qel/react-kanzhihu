var React = require('react');
var PropTypes = React.PropTypes;
// var Img = require('./img');
var ImageLoader = require('react-imageloader');
var Link = require('react-router').Link;

var _anti_hotlink_base = 'http://anti-anti-hotlink-9defc.coding.io/img?q=';
// mock material ui card componet.

var Card = require('material-ui/lib/card/card');
var CardActions= require('material-ui/lib/card/card-actions');
var CardHeader= require('material-ui/lib/card/card-header');
var CardMedia= require('material-ui/lib/card/card-media');
var CardTitle= require('material-ui/lib/card/card-title');
var FlatButton= require('material-ui/lib/flat-button');
var CardText= require('material-ui/lib/card/card-text');

var FlatButton=require('material-ui/lib/flat-button');

// css styles
var _styles={
  _container:{
    width:'90%',
    margin:'5px auto'
  },
  _cardContainer:{
    marginBottom:'10px'
  },
  _img:{
    width:'100%'
  }
};

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
  getUri:function(src){
    return _anti_hotlink_base+src.substring(src.lastIndexOf('/')+1);
  },
  render: function() {
    var self = this;

    // TODO: use loading gif
    var preloader = function(){
      return <p>加载中</p>;
    };

    return (<div style={_styles._container}>
        {this.props.items.map(function(item,key){

          _pubTime = (new Date(parseInt(item.publishtime)*1000)).toLocaleString();
          return (<div style={_styles._cardContainer}><Card>
            <CardMedia overlay={<CardTitle title={self.realname(item.name).text} subtitle={'发布于：'+_pubTime}>
            </CardTitle>}>
              <ImageLoader imgProps={_styles._img} src={self.getUri(item.pic)} preloader={preloader} >加载失败</ImageLoader>
            </CardMedia>
            {/*<CardTitle title={self.realname(item.name).text} subtitle={'发布于：'+_pubTime}>
            </CardTitle> */}
            <CardText>
              {item.excerpt}
            </CardText>
            <CardActions>
              <FlatButton containerElement={<Link to={'/article/'+self.getId(item)} />} secondary={true} label='阅读文章'></FlatButton>
            </CardActions>
          </Card></div>);
        })}
      </div>);
  }


});

module.exports = Articles;
