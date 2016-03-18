var React = require('react');
var PropTypes = React.PropTypes;
var ImageLoader = require('react-imageloader');

var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');
var Subheader = require('material-ui/lib/Subheader');
var Avatar = require('material-ui/lib/avatar');
var darkBlack = require('material-ui/lib/styles/colors').darkBlack;
var blue500 = require('material-ui/lib/styles/colors').blue500;
var FontIcon = require('material-ui/lib/font-icon');

var _anti_hotlink_base = 'http://anti-anti-hotlink-9defc.coding.io/img?z=';

var Answers = React.createClass({

  getpersonlink:function(item){
    return 'http://www.zhihu.com/people/'+item.authorhash;
  },
  getanswerlink:function(item){
    return 'http://www.zhihu.com/question/'+item.questionid+'/answer/'+item.answerid;
  },
  getsub:function(){
    if(this.props.subTitle == '0') return '昨日最新';
    if(this.props.subTitle == '1') return '今日热门';
    if(this.props.subTitle == '100') return '历史精华';
    return '';
  },
  getAvatarUri:function(url){
    return _anti_hotlink_base+url.substring(8);
  },
  handleTap:function(item){
    var _uri = this.getanswerlink(item);
    window.open(_uri);
  },
  render: function() {
    console.log('>>> answers rendering');
    var self = this;
    if(this.props.items.length == 0) return (<div></div>);
    var sub = [<Subheader>{this.getsub()}</Subheader>];
    var items = [];
    for(var i=0; i<this.props.items.length; i++){
      var item = this.props.items[i];
      items.push(<ListItem
        onClick = {this.handleTap.bind(this,item)}
        leftAvatar={<Avatar src={this.getAvatarUri(item.avatar)} />}
        primaryText={this.props.items[i]['title']}
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>{item.authorname}</span>
            <span>
              {'('+item.vote}
              <FontIcon
                className="material-icons"
                color = {blue500}
                style ={{fontSize:'14px'}}>
                thumb_up
              </FontIcon>
              {')'}
            </span><br />
            {item.summary}
          </p>
        }
        secondaryTextLines={3}
      />);
      if(i<this.props.items.length-1){
        items.push(<Divider inset={true} />);
      }
    };

    return React.createElement(List,null,sub.concat(items));
  }
});

module.exports = Answers;
