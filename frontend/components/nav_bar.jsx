var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require('react');
var Search = require("./search.jsx");

var NavBar = React.createClass({

  render: function () {
    return (
      <div className="header">
        <div className="bar">
          <Search/>
          <h2>Picstagram</h2>
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
