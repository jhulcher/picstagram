var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require('react');
var History = require("react-router").History;

var Search = React.createClass({

  handleInput: function (event) {
    this.setState({ inputVal: event.currentTarget.value });
  },

  getInitialState: function () {
    return {inputVal: "", names: []};
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(function () {
      this.setState({ names: UserStore.all() });
    }.bind(this));
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  matches: function () {
    var matches = [];
    if (this.state.inputVal !== "") {
      this.state.names.forEach(function (user) {
        var sub = user.username.slice(0, this.state.inputVal.length);
        if(sub.toLowerCase() === this.state.inputVal.toLowerCase()){
          matches.push(user);
        }
      }.bind(this));
    }
    return matches;
  },

  uniq: function (users) {
    var matches = [];
    users.forEach (function (user) {
      if (matches.indexOf(user) === -1) {
        matches.push(user);
      }
    });
    return matches;
  },

  selectName: function (event) {
    var name = event.currentTarget.innerText;
    this.setState({ inputVal: name });
  },

  inputKeyDown: function (e, input) {
    if (e.keyCode === "13") {
        var textarea = document.getElementById("search_input");
        textarea.value += "\n" + input.value;
        input.value = "";
        return false;
    }
},

  render: function () {
    var results = this.matches();
    var users = this.uniq(results);
    return (
      <div className="cursor search left">
        <input type="text"
               key="search_input"

               onkeydown="return inputKeyDown(event, this);"

               placeholder="Search Users"
               onChange={this.handleInput}
               value={this.state.inputVal} />
        <ul className="left-align">
          {
            users.map(function (result, i) {
              return (
                <li key={result.id}
                    className="drop-text"
                    onClick={this.selectName}>
                  {result.username}
                </li>
              );
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

module.exports = Search;
