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
      var deleteStatus = <h5
                          onClick={this.handleDeleteClick}
                          className="cursor album_pic_delete">
                            delete
                          </h5>;
    } else {
          deleteStatus = "";
    }
    if (this.props.pic.already_liked === true) {
      var likeStatus = <div className="cursor album_unlike_button"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.props.pic.already_liked,
                           this.props.pic.id)}>
                              ★
                       </div>;
    } else {
          likeStatus = <div className="cursor album_like_button"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.props.pic.already_liked,
                           this.props.pic.id)}>
                              ★
                           </div>;
    }
    if (this.props.pic.likes_count > 0) {
      var likeCount = this.props.pic.likes_count;
    } else {
          likeCount = " ";
    }
    return (
      <center>
        <div className="cursor album_pic_div"
             key={ this.props.pic.id }
             onClick={this.handleClick}>
             <img src={
                    "http://res.cloudinary.com/picstagram/image/upload/s-" +
                    "-cdzgeeOu--/c_fill,g_center,h_550,q_91,w_550/" +
                    this.props.pic.public_id + ".jpg"
                  }
                  className="album_pic_display">
             </img>
        </div>
        <div className="album_entry_width">
          <div className="album_like_div">
            { likeStatus }
          </div>
          <div className="album_like">
            { likeCount }
          </div>
          <div className="album_when">
            { this.props.pic.created_at }
          </div>
          <div className="delete_x">
            { deleteStatus }
          </div>
        </div>
        <div className="album_width">
          <Comments pic={this.props.pic} className="albumcomments"></Comments>
        </div>
      </center>
    );
  }
});

module.exports = AlbumEntry;
