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
          <div className="title-item headerleft">
            <h2 onClick={this.handleClick}
                className="cursor">
                  Picstagram
            </h2>
          </div>
          <UploadButton className="header-item cursor"></UploadButton>
          <h3 className="header-item logout right cursor"
              onClick={this.handleLogOut}>
            Sign Out
          </h3>
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
