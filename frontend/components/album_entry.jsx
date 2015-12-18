var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var cur = window.current_user_id;

var AlbumEntry = React.createClass({

  mixins: [History],

  handleClick: function () {
    this.history.pushState( null, "pic/" + this.props.pic.id );
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: this.props.pic.user_id} );
  },

  render: function () {
    return (
      <center>
          <br></br>
          <div key={ this.props.pic.id } onClick={this.handleClick}>
            pic id: { this.props.pic.id }
          <br></br>
            url: { this.props.pic.public_id }
          <br></br>
            time since; { this.props.pic.created_at }
          <br></br>
          <br></br>
        </div>
      </center>
    );
  }
});

module.exports = AlbumEntry;
