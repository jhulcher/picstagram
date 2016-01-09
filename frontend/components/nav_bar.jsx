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
      <div className="header_div">
        <div className="nav_bar">
          <Search></Search>
          <div className="header_logo">
            <h2 onClick={this.handleClick}
                className="cursor">
                  Picstagram
            </h2>
          </div>
          <UploadButton className="header_item cursor"></UploadButton>
          <h3 className="log_out cursor"
              onClick={this.handleLogOut}>
            Sign Out
          </h3>
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
