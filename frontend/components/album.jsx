var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var AlbumEntry = require("./album_entry.jsx");
var FolloweesStore = require("../stores/followees.js");
var UserStore = require("../stores/user.js");
var NavBar = require("./nav_bar.jsx");

var Album = React.createClass({

  getInitialState: function () {
    return (
        { pics: [] }
    );
  },

  componentDidMount: function () {
    ApiUtil.fetchPicsFromUser(parseInt(this.props.location.query.id));
    this.listener = PicStore.addListener(function () {
      this.setState({ pics: PicStore.all() });
    }.bind(this));

    ApiUtil.fetchFollowees();
    this.followListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.followListener.remove();
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  render: function () {
    var count = 0;
    return (
      <ul>
        <NavBar></NavBar>
        {
          this.state.pics.map (function (pic, idx) {
            count += 1;
            if (FolloweesStore.find(parseInt(pic.user_id))) {
              var followStatus = "Unfollow";
            } else {
                  followStatus = "Follow";
            }
            if (PicStore.all().length === 1) {
              return (
                <li key={pic.user_id}>
                  { pic.username }
                  <div className="cursor"
                    key={1111}
                    onClick={this.handleFollowClick.bind(
                    null, pic.user_id, followStatus)}>
                    { followStatus }
                  </div>
                  <br></br>
                  <br></br>
                  User has no pics
                </li>
              );
            } else {
               if (count === 1) {
                return (
                  <li key={pic.user_id} >
                      { pic.username }
                      <div className="cursor"
                        key={1111}
                        onClick={this.handleFollowClick.bind(
                        null, pic.user_id, followStatus)}>
                        { followStatus }
                      </div>
                      <br></br>
                      <br></br>
                      <AlbumEntry pic={pic} key={pic.id}></AlbumEntry>
                  </li>
                );
              } else {
                return (
                  <li key={pic.id} >
                    <AlbumEntry pic={pic} key={pic.id} />
                  </li>
                );
              }
            }
          }.bind(this))
        }
      </ul>
    );
  }
});

module.exports = Album;
