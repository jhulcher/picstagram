var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var History = require("react-router").History;
var CurrentUserId = window.current_user_id;

var UploadButton = React.createClass({

  mixins: [History],

  incomingPic: function (pic) {
    this.history.push("pic/" + pic.id);
  },

  upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS,
      function(error, results) {
        if(!error){
          ApiUtil.createPic(this.incomingPic,
            "http://res.cloudinary.com/picstagram/image/upload/c_lfill,g_center,h_500,q_81,r_0,w_500/" + results[0].public_id + ".jpg"
          );
        }
      }.bind(this)
    );
  },

  render: function () {
    return (
      <button onClick={this.upload} className="camera-button">📷</button>
    );
  }

});

module.exports = UploadButton;
