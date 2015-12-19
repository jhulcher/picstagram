var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var Pic = require("./pic.jsx");
var FeedEntry = require("./feed_entry.jsx");
var FolloweesStore = require("../stores/followees.js");

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
    return (
      <ul>
        { this.state.pics.map (function (pic) {
          return (
            <li key={pic.id} >
              <center>
                <FeedEntry pic={ pic }> </FeedEntry>
              </center>
            </li>
          );
        })}
      </ul>
    );
  }
});

module.exports = Feed;
