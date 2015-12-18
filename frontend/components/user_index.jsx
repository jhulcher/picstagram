var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
// var History = require("react-router").History;
var UserIndex = React.createClass({
  // mixins: [History],
  getInitialState: function () {
    return (
      { users: [] }
    );
  },

  handleClick: function (id) {
    this.props.history.pushState( null, "user", {id: id} );
  },

  componentDidMount: function () {
    ApiUtil.fetchUsers();
    this.listener = UserStore.addListener(function () {
      this.setState({ users: UserStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },


  render: function () {
    return (
      <ul>
        { this.state.users.map (function (user) {
          return (
            <li key={user.id} onClick={this.handleClick.bind(null, user.id)}>
              <center>
                { user.username }
                <br></br>
                <br></br>
              </center>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = UserIndex;
