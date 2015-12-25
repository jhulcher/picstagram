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
    // if (this.props.pic.user_id !== cur) {
    //   if (FolloweesStore.find(parseInt(this.props.pic.user_id))) {
    //     var followStatus = "Unfollow";
    //   } else {
    //         followStatus = "Follow";
    //   }
    // }
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
             <img src={"http://res.cloudinary.com/picstagram/image/upload/c_lfill,g_center,h_500,q_81,r_0,w_500/" + this.props.pic.public_id + ".jpg"}
                 className="picdisplaysmall">
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

module.exports = FeedEntry;
