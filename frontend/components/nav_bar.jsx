var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require('react');
var Search = require("./search.jsx");
var UploadButton = require("./upload_button.jsx");
var History = require("react-router").History;

var NavBar = React.createClass({

  mixins: [History],

  handleClick: function (event) {
    this.history.pushState( null, "/");
  },

  handleLogOut: function (event) {
    ApiUtil.logOut();
  },

  render: function () {
    return (
      <div className="header">
        <div className="bar">
          <Search></Search>
          <h2 className="title-item cursor"
              onClick={this.handleClick}>
                Picstagram
          </h2>
          <UploadButton className="header-item  cursor"></UploadButton>
          <h3 className="header-item logout cursor"
              onClick={this.handleLogOut}>
            Log Out
          </h3>
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
