var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");

var UserPicsIndex = React.createClass({
  getInitialState: function () {
    return (
        { pics: [] }
    );
  },

  componentDidMount: function () {
    PicStore.addListener(function () {
      this.setState({ pics: PicStore.all() });
    }.bind(this));
  },

  render: function () {
    return (
      <ul>
        { this.state.pics.map (function (pic) {
          return (
            <li key={pic.id} onClick={this.handleClick.bind(null, pic.id)}>
              { pic.id }
              { pic.username }
              { pic.id }
              { pic.public_id }
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = UserPicsIndex;
