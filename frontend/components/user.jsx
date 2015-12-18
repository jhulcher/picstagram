var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");

var User = React.createClass({
  getInitialState: function () {
    return (
      { user: [] }
    );
  },

  componentDidMount: function () {
    this.setState({
      user: UserStore.find(
        parseInt(this.props.location.query.id)
      )
    });
  },

  render: function () {
    return (
      <div key={ this.state.user.id }>
      hi
         { this.state.user.id }
      </div>
    );
  }

});

module.exports = User;
