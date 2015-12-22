var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var cur = window.current_user_id;
var FolloweesStore = require("../stores/followees.js");

var AlbumEntry = React.createClass({

  mixins: [History],

  handleClick: function () {
    this.history.pushState( null, "pic/" + this.props.pic.id );
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: this.props.pic.user_id} );
  },

  handleDeleteClick: function () {
    ApiUtil.deletePic(this.props.pic.id);
    this.history.pushState( null, 'album', {id: this.props.pic.user_id} );
  },

  render: function () {
    if (FolloweesStore.find(parseInt(this.props.pic.user_id))) {
      var followStatus = "Unfollow";
    } else {
          followStatus = "Follow";
    }
    return (
      <center>
        pic id: { this.props.pic.id }
        <br></br>
        url: { this.props.pic.public_id }
        <div className="cursor"
          key={ this.props.pic.id }
          onClick={this.handleClick}>
            <img src={ this.props.pic.public_id }></img>
        </div>
        <br></br>

        <h4 onClick={this.handleDeleteClick}
            className="cursor">
          Delete
        </h4>

        <br></br>
        time since; { this.props.pic.created_at }
        <br></br>
        <br></br>
      </center>
    );
  }
});

module.exports = AlbumEntry;
