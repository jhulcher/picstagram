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

  mixins: [LinkedStateMixin, History],

  getInitialState: function() {
    return {content: ""};
  },

  handleDeleteClick: function (id) {
    ApiUtil.deleteComment(id);
  },

  handleSubmit: function (e) {
    e.preventDefault();
      ApiUtil.createComment(this.props.pic.id, this.state.content);
      this.setState({content: ""});
  },

  handleUserClick: function (id) {
    this.history.pushState( null, "album", {id: id} );
  },

  render: function () {
    return (
      <ul>
        {
          this.props.pic.comments.map (function (comment, idx) {
            if (cur === comment.author_id) {
              var deleteStatus = <i
                                   className="fa fa-times cursor comment_delete"
                                   onClick={this.handleDeleteClick.bind(
                                     null,
                                     comment.id)}>
                                </i>;
            } else {
                  deleteStatus = "";
            }
            return (
                <li key={comment.id} className="comment_div">
                  <div className="cursor comment_name"
                       onClick={
                         this.handleUserClick.bind(null, comment.author_id)}>
                    { comment.author }:
                  </div>
                  <div className="comment_body">
                    { comment.comment }
                  </div>
                  { deleteStatus }
                  <br></br>
                </li>
            );
          }.bind(this))
        }
        <li className="text_left">
          <form method="POST"
                onSubmit={this.handleSubmit}>
            <input type="comment"
                   maxLength="30"
                   className="comment_field"
                   placeholder="..."
                   valueLink={this.linkState('content')}/>

          </form>
        </li>
      </ul>
    );
  }
});

module.exports = Comments;
