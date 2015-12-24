var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var cur = window.current_user_id;
var FolloweesStore = require("../stores/followees.js");
var Comments = require("./comment.jsx");

var AlbumEntry = React.createClass({

  mixins: [History],

  handleClick: function () {
    this.history.pushState( null, "pic/" + this.props.pic.id );
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: this.props.pic.user_id} );
  },

  handleDeleteClick: function () {
    ApiUtil.deletePic(this.props.pic.id);
    this.history.pushState( null, 'album', {id: this.props.pic.user_id} );
  },

  handleLikeClick: function (likeStatus, id) {
    if (likeStatus === false) {
      ApiUtil.createLike(id);
    } else {
      ApiUtil.deleteLike(id);
    }
  },

  render: function () {
    if (this.props.pic.user_id === cur) {
      var deleteStatus = <h4
                          onClick={this.handleDeleteClick}
                          className="cursor">
                            Delete
                          </h4>;
    } else {
          deleteStatus = "";
    }
    if (this.props.pic.already_liked === true) {
      var likeStatus = <h4 className="cursor"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.props.pic.already_liked,
                           this.props.pic.id)}>
                              Unlike
                       </h4>;
    } else {
          likeStatus = <h4 className="cursor"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.props.pic.already_liked,
                           this.props.pic.id)}>
                              Like
                           </h4>;
    }
    return (
      <center>
        <div className="cursor"
             key={ this.props.pic.id }
             onClick={this.handleClick}>
             <img src={ this.props.pic.public_id }
                  className="picdisplay">
             </img>
        </div>
        { likeStatus }
        { this.props.pic.created_at }
        { deleteStatus }
        <Comments pic={this.props.pic}></Comments>

      </center>
    );
  }
});

module.exports = AlbumEntry;
