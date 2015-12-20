var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var Pic = require("./pic.jsx");
var FeedEntry = require("./feed_entry.jsx");
var FolloweesStore = require("../stores/followees.js");
var Search = require("./search.jsx");
var UserStore = require("../stores/user.js");
var NavBar = require("./nav_bar.jsx");

var Feed = React.createClass({

  getInitialState: function () {
    return (
      { pics: [] }
    );
  },

  componentDidMount: function () {
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

  render: function () {
    if (FolloweesStore.all().length === 0) {
      return (
        <ul>
          <NavBar></NavBar>
          <li>
            You're not following anyone!
            <br></br>
            Start following to get your feed going!
          </li>
        </ul>
      );
    } else if (PicStore.all()[0].length === 0) {
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
            this.state.pics.map (function (pic) {
              return (
                <li key={pic.id} >
                  <center>
                    <FeedEntry pic={ pic }> </FeedEntry>
                  </center>
                </li>
              );
            })
          }
        </ul>
      );
    }
  }
});

module.exports = Feed;
