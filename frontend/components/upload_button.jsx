var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var History = require("react-router").History;
var CurrentUserId = window.current_user_id;

var UploadButton = React.createClass({

  upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS,
      function(error, results) {
        if(!error){
          // results[0].height
          // results[0].width
          ApiUtil.createPic(results[0].secure_url);
          // ApiUtil.fetchAllPicsFromUser();
        }
      }
    );
  },

  render: function () {
    return (
      <button onClick={this.upload} className="camera-button">📷</button>
    );
  }

});

module.exports = UploadButton;
