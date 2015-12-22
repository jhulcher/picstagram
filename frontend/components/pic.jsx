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
      this.forceUpdate();
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.followListener.remove();
    this.listener.remove();
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: PicStore.all()[0].user_id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  handleDeleteClick: function (id) {
    ApiUtil.deletePic(id);
    this.history.pushState( null, "/");
  },

  render: function () {
    if (PicStore.all()[0].user_id !== cur) {
      if (FolloweesStore.find(parseInt(PicStore.all()[0].user_id))) {
        var followStatus = "Unfollow";
      } else {
            followStatus = "Follow";
      }
    }
    if (PicStore.all()[0].user_id === cur) {
      var deleteStatus = <h4
                          onClick={this.handleDeleteClick}
                          className="cursor">
                            Delete
                          </h4>;
    } else {
          deleteStatus = "";
    }
    return (
      <center>
        <NavBar></NavBar>
        <div key={ PicStore.all()[0].id }>
          <div className="cursor"
            key={ PicStore.all()[0].id }
            onClick={this.handleUserClick}
            div>
              { PicStore.all()[0].username }
          </div>
          <div className="cursor"
              onClick={
                this.handleFollowClick.bind(
                  null, PicStore.all()[0].user_id, followStatus)}>
              { followStatus }
          </div>
          <br></br>
            <img src={ PicStore.all()[0].public_id }
                 className="picdisplay">
            </img>
          <br></br>
            { deleteStatus }
          <br></br>
            { PicStore.all()[0].created_at }
        </div>
      </center>
    );
  }

});

module.exports = Pic;
