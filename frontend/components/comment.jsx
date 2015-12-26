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
              var deleteStatus = <div className="cursor commentleft deletex commentdelete"
                                      onClick={this.handleDeleteClick.bind(
                                        null,
                                        comment.id)}>
                                  ✕
                                </div>;
            } else {
                  deleteStatus = "";
            }
            return (
                <li key={comment.id} className="commentpad commentwidth commentleft comment-size textleft">
                  <div className="cursor commentleft commentpad commentname" onClick={
                    this.handleUserClick.bind(null, comment.author_id)}>
                      { comment.author }:
                  </div>
                  <div className="commentleft commentpad">
                    { comment.comment }
                  </div>
                  { deleteStatus }
                  <br></br>
                </li>
            );
          }.bind(this))
        }
        <li className="">
          <form method="POST"
                className="textleft"
                onSubmit={this.handleSubmit}>
            <input type="comment"
                   maxLength="30"
                   className="commentcolor"
                   placeholder="..."
                   valueLink={this.linkState('content')}/>

          </form>
        </li>
      </ul>
    );
  }
});

module.exports = Comments;
