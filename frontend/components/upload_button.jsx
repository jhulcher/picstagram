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
          ApiUtil.createPic(
            this.incomingPic,
            results[0].public_id
          );
        }
      }.bind(this)
    );
  },

  render: function () {
    return (
      <div className="camera_button">
        <i className="cursor fa fa-camera camera_icon"
           onClick={this.upload}>
         </i>
      </div>
    );
  }

});

module.exports = UploadButton;
