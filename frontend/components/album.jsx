var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var AlbumEntry = require("./album_entry.jsx");
var FolloweesStore = require("../stores/followees.js");

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
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    return (
      <ul>
        <li>
          { this.state.pics.username }
        </li>
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
