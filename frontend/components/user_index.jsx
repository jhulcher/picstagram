var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var FolloweesStore = require("../stores/followees.js");
var NavBar = require("./nav_bar.jsx");
var UploadButton = require("./upload_button.jsx");

var UserIndex = React.createClass({

  getInitialState: function () {
    return (
      { users: [] }
    );
  },

  findFollowee: function (id) {
    return ({
      followee: FolloweesStore.find(parseInt(this.props.params.id))
    });
  },

  handleClick: function (id) {
    this.props.history.pushState( null, "album", {id: id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  componentDidMount: function () {
    ApiUtil.fetchUsers();
    this.userListener = UserStore.addListener(function () {
      this.setState({ users: UserStore.all() });
    }.bind(this));

    ApiUtil.fetchFollowees();
    this.followeeListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.followeeListener.remove();
  },

  render: function () {
    return (
      <center >
        <NavBar></NavBar>
        <ul>
          {
            this.state.users.map (function (user, idx) {
              if (FolloweesStore.find(user.id)) {
                var followStatus = "Unfollow";
              } else {
                    followStatus = "Follow";
              }
              return (
                <li key={idx}>
                  <div className="cursor"
                    key={user.id}
                    onClick={this.handleClick.bind(null, user.id)}>
                    { user.username }
                  </div>
                  <div className="cursor"
                    key={user.id * 111}
                    onClick={this.handleFollowClick.bind(
                    null, user.id, followStatus)}>
                    { followStatus }
                  </div>
                </li>
              );
            }.bind(this))
          }
        </ul>
      </center>
    );
  }
});

window.UserIndex = UserIndex;

module.exports = UserIndex;
