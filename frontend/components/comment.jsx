var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var FolloweesStore = require("../stores/followees.js");
var Search = require("./search.jsx");
var NavBar = require("./nav_bar.jsx");
var UploadButton = require("./upload_button");
var cur = window.current_user_id;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Comments = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {content: ""};
  },

  // handleClick: function (e) {
  //   e.preventDefault();
  //   ApiUtil.createComment(this.props.pic.id, this.state.content);
  //   this.setState({content: ""});
  // },

  handleDeleteClick: function (id) {
    ApiUtil.deleteComment(id);
  },

  handleSubmit: function (e) {
    e.preventDefault();
      ApiUtil.createComment(this.props.pic.id, this.state.content);
      this.setState({content: ""});
  },

  render: function () {
    return (
      <ul>
        {
          this.props.pic.comments.map (function (comment, idx) {
            if (cur === comment.author_id) {
              var deleteStatus = <div className="cursor"
                                      onClick={this.handleDeleteClick.bind(
                                        null,
                                        comment.id)}>
                                X
                             </div>;
            } else {
                  deleteStatus = "";
            }
            return (
                <li key={comment.id}>
                  { comment.author }: &nbsp;
                  { comment.comment }
                  { deleteStatus }
                </li>
            );
          }.bind(this))
        }
        <li>
          <form type="" method="POST" onSubmit={this.handleSubmit}>
            <input type="text"
                   placeholder="Add Comment"
                   valueLink={this.linkState('content')}/>

          </form>
        </li>
      </ul>
    );
  }
});

module.exports = Comments;
