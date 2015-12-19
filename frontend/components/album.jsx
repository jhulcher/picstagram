var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var AlbumEntry = require("./album_entry.jsx");
var FolloweesStore = require("../stores/followees.js");
var UserStore = require("../stores/user.js");

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
      this.forceUpdate();
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.followListener.remove();
  },

  render: function () {
    return (
      <ul>
        { this.state.pics.map (function (pic) {
          return (
            <li key={pic.id} >
              <center>
                <AlbumEntry pic={ pic }> </AlbumEntry>
              </center>
            </li>
          );
        })}
      </ul>
    );
  }
});

module.exports = Album;
