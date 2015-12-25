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
var Comments = require("./comment.jsx");


var Pic = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
      { pic: PicStore.find(parseInt(this.props.params.id)) }
    );
  },

  componentDidMount: function () {
    ApiUtil.fetchFollowees();
    this.followListener = FolloweesStore.addListener(function () {
      this.forceUpdate();
    }.bind(this));

    ApiUtil.fetchSinglePic(this.props.params.id);
    this.listener = PicStore.addListener(function () {
      this.setState( { pic: PicStore.find(parseInt(this.props.params.id)) } );
      this.forceUpdate();
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.followListener.remove();
    this.listener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSinglePic(parseInt(newProps.params.id));
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: this.state.pic.user_id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  handleLikeClick: function (likeStatus, id) {
    if (likeStatus === false) {
      ApiUtil.createLike(id);
    } else {
      ApiUtil.deleteLike(id);
    }
  },

  handleDeleteClick: function () {
    ApiUtil.deletePic(this.state.pic.id);
    this.history.pushState( null, "/");
  },

  render: function () {
    if (!this.state.pic) {
      return (<div></div>);
    }

    if (this.state.pic.user_id !== cur) {
      if (FolloweesStore.find(parseInt(this.state.pic.user_id))) {
        var followStatus = "Unfollow";
      } else {
            followStatus = "Follow";
      }
    }
    if (this.state.pic.user_id === cur) {
      var deleteStatus = <h4
                          onClick={this.handleDeleteClick}
                          className="cursor">
                            "Delete"
                          </h4>;
    } else {
          deleteStatus = "";
    }
    if (this.state.pic.already_liked === true) {
      var likeStatus = <h4 className="cursor"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.state.pic.already_liked,
                           this.state.pic.id)}>
                              Unlike
                       </h4>;
    } else {
          likeStatus = <h4 className="cursor"
                           onClick={this.handleLikeClick.bind(
                           null,
                           this.state.pic.already_liked,
                           this.state.pic.id)}>
                              Like
                           </h4>;
    }
    return (
      <center>
        <NavBar></NavBar>
        <div key={ this.state.pic.id }>
          <div className="cursor"
               key={ this.state.pic.id }
               onClick={this.handleUserClick}
               div>
                { this.state.pic.username }
          </div>
          <div className="cursor"
               onClick={
                 this.handleFollowClick.bind(
                   null,
                   this.state.pic.user_id,
                   followStatus)}>
              { followStatus }
          </div>
            <img src={ "http://res.cloudinary.com/picstagram/image/upload/s--cdzgeeOu--/c_fill,g_center,h_550,q_91,w_550/" + this.state.pic.public_id + ".jpg" }
                 className="picdisplaylarge">
            </img>
            { likeStatus }
            { this.state.pic.created_at }
            { deleteStatus }
            <Comments pic={this.state.pic}></Comments>
        </div>
      </center>
    );
  }

});

module.exports = Pic;
