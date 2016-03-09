var React = require('react');
var PropTypes = React.PropTypes;
var ImageLoader = require('react-imageloader');

var Answers = React.createClass({

  getpersonlink:function(item){
    return 'http://www.zhihu.com/people/'+item.authorhash;
  },
  getanswerlink:function(item){
    return 'http://www.zhihu.com/question/'+item.questionid+'/answer/'+item.answerid;
  },
  render: function() {
    console.log('>>> answers rendering');
    var self = this;
    return (<div>
        {this.props.items.map(function(item){
          return(<div>
            <h3>{item.title}</h3>
            <p>
              <a href={self.getpersonlink(item)} target='_blank'>
              <ImageLoader src={item.avatar} /></a>
              <span>
                <a href={self.getpersonlink(item)} target='_blank'>{item.authorname}</a>
                <span>{'('+item.vote+')'}</span>
                {item.summary}
                <span><a href={self.getanswerlink(item)}>[阅读全文]</a></span>
              </span>
            </p>
          </div>)
        })}
      </div>);
  }
});

module.exports = Answers;
