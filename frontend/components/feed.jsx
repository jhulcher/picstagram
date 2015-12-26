var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var Pic = require("./pic.jsx");
var FeedEntry = require("./feed_entry.jsx");
var FolloweesStore = require("../stores/followees.js");
var Search = require("./search.jsx");
var UserStore = require("../stores/user.js");
var NavBar = require("./nav_bar.jsx");
var UploadButton = require("./upload_button.jsx");
var cur = window.current_user_id;
var History = require("react-router").History;

var Feed = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
      { pics: [] }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchFeedForUser();
    this.listener = PicStore.addListener(function () {
      this.setState({ pics: PicStore.all() });
    }.bind(this));

    ApiUtil.fetchFollowees();
    this.followeesListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.followeesListener.remove();
  },

  handleUserClick: function (id) {
    this.history.pushState( null, "album", {id: id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
    ApiUtil.fetchFeedForUser();
  },

  render: function () {
    if (PicStore.all().length === 0) {
      return (
        <ul>
          <NavBar></NavBar>
          <li>
            The users you're following haven't uploaded pics yet.
            <br></br>
            Follow more users to get your feed going!
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <NavBar></NavBar>
          {
            this.state.pics.map (function (pic, idx) {
              if (pic.user_id !== cur) {
                if (FolloweesStore.find(parseInt(pic.user_id))) {
                  var followStatus = "unfollow";
                } else {
                      followStatus = "follow";
                }
              }
              return (
                <li key={idx} className="feedentrypad">
                  <center>
                    <div className="albumheaderwidth albumcomments">
                      <div className="cursor feedname commentleft" onClick={
                        this.handleUserClick.bind(null, pic.user_id)}>
                          { pic.username }
                      </div>
                      <div className="cursor average-text feedfollow right deletex"
                           key={1111}
                           onClick={this.handleFollowClick.bind(
                           null, pic.user_id, followStatus)}>
                            { followStatus }
                      </div>
                    </div>
                    <FeedEntry pic={ pic }> </FeedEntry>
                  </center>
                </li>
              );
            }.bind(this))
          }
        </ul>
      );
    }
  }
});

module.exports = Feed;
