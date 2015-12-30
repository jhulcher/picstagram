var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var cur = window.current_user_id;
var FolloweesStore = require("../stores/followees.js");
var Comments = require("./comment.jsx");

var FeedEntry = React.createClass({

  mixins: [History],

  componentDidMount: function () {
    ApiUtil.fetchFollowees();
    this.followeesListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.followeesListener.remove();
  },

  handleClick: function () {
    this.history.pushState( null, "pic/" + this.props.pic.id );
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: this.props.pic.user_id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  handleDeleteClick: function () {
    ApiUtil.deletePic(this.props.pic.id);
    this.history.pushState( null, "/");
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
                          className="cursor albumcomments hovgrow">
                            delete
                          </h5>;
    } else {
          deleteStatus = "";
    }
    if (this.props.pic.already_liked === true) {
      var likeStatus = <div className="cursor albumcomments unlikebutton"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.props.pic.already_liked,
                           this.props.pic.id)}>
                              ★
                       </div>;
    } else {
          likeStatus = <div className="cursor albumcomments likebutton"
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
        <div className="cursor pictoppad albumwidth"
             key={ this.props.pic.id }
             onClick={this.handleClick}>
             <img src={
                    "http://res.cloudinary.com/picstagram/image/upload/s-" +
                    "-cdzgeeOu--/c_fill,g_center,h_550,q_91,w_550/" +
                    this.props.pic.public_id + ".jpg"
                }
                  className="picdisplaysmall picshadow">
             </img>
        </div>
        <div className="entryinfowidth albumcomments">
          <div className="commentleft underpic">
            { likeStatus }
          </div>
          <div className="commentleft average-text underpic
                          likecount underpicpad">
            { likeCount }
          </div>
          <div className="commentleft underpic average-text underpicpad when">
            { this.props.pic.created_at }
          </div>
          <div className="right underpic underpicpad deletex">
            { deleteStatus }
          </div>
        </div>
        <div className="albumwidth">
          <Comments pic={this.props.pic} className="albumcomments"></Comments>
        </div>
      </center>
    );
  }
});

module.exports = FeedEntry;
