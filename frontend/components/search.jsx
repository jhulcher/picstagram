var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require('react');
var History = require("react-router").History;

var Search = React.createClass({

  handleInput: function (event) {
    this.setState({ inputVal: event.currentTarget.value });
  },

  getInitialState: function () {
    var nameArray = [];
    ApiUtil.fetchUsers();
    this.userListener = UserStore.addListener(function () {
      UserStore.all().map (function (user) {
        nameArray.push(user.username);
      });
    });
    return {inputVal: "", names: nameArray};
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  matches: function () {
    var matches = [];

    if (this.state.inputVal !== "") {
      this.state.names.forEach(function (name) {
        var sub = name.slice(0, this.state.inputVal.length);
        if(sub.toLowerCase() === this.state.inputVal.toLowerCase()){
          matches.push(name);
        }
      }.bind(this));
    }
    return matches;
  },

  selectName: function (event) {
    var name = event.currentTarget.innerText;
    this.setState({ inputVal: name });
  },

  render: function () {
    var results = this.matches();
    return (
      <div className="cursor float search">
        <input type="text"
               placeholder="search users"
               onChange={this.handleInput}
               value={this.state.inputVal} />
        <ul className="left-align">
          {
            results.map(function (result, i) {
              return (
                <li key={i}
                    className="drop-text"
                    onClick={this.selectName}>{result}
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
