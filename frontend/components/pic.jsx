var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");

var Pic = React.createClass({
  getInitialState: function () {
    return (
      { pic: [] }
    );
  },

  componentDidMount: function () {
    this.setState({
      pic: PicStore.find(
        parseInt(this.props.location.query.id)
      )
    });
  },

  render: function () {
    return (
      <div key={ this.state.pic.id }>
        hey there
        { this.state.pic.id }
      </div>
    );
  }

});

module.exports = Pic;
