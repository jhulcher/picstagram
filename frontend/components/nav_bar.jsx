var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require('react');
var Search = require("./search.jsx");
var UploadButton = require("./upload_button.jsx");

var NavBar = React.createClass({

  render: function () {
    return (
      <div className="header">
        <div className="bar">
          <Search></Search>
          <h2 className="header-item">Picstagram</h2>
          <UploadButton className="header-item right"></UploadButton>
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
