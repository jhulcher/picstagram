var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var FolloweesStore = require("../stores/followees.js");

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
      <ul>
        { this.state.users.map (function (user) {

          if (FolloweesStore.find(user.id)) {
            var followStatus = "Unfollow";
          } else {
                followStatus = "Follow";
          }

          return (
            <li>
              <ul>
                <li key={user.id}
                    onClick={this.handleClick.bind(null, user.id)
                    }>
                  <center>
                    { user.username }
                    { user.id }
                  </center>
                </li>
                <li>
                <center>

                { followStatus }

                  <br></br>
                  <br></br>
                </center>
                </li>
              </ul>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

window.UserIndex = UserIndex;

module.exports = UserIndex;
