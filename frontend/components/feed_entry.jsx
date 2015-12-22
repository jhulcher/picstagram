var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var cur = window.current_user_id;
var FolloweesStore = require("../stores/followees.js");

var FeedEntry = React.createClass({

  mixins: [History],

  componentDidMount: function () {
    ApiUtil.fetchFollowees();
    this.followeesListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.followeesListener.remove();
  },

  handleClick: function () {
    this.history.pushState( null, "pic/" + this.props.pic.id );
  },

  handleUserClick: function () {
    this.history.pushState( null, "album", {id: this.props.pic.user_id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  handleDeleteClick: function () {
    ApiUtil.deletePic(this.props.pic.id);
    this.history.pushState( null, "/");
  },

  render: function () {
    if (this.props.pic.user_id !== cur) {
      if (FolloweesStore.find(parseInt(this.props.pic.user_id))) {
        var followStatus = "Unfollow";
      } else {
            followStatus = "Follow";
      }
    }
    if (this.props.pic.user_id === cur) {
      var deleteStatus = <h4
                          onClick={this.handleDeleteClick}
                          className="cursor">
                            Delete
                          </h4>;
    } else {
          deleteStatus = "";
    }
    return (
      <center>
        <div className="cursor" onClick={
          this.handleUserClick.bind(null, this.props.pic.user_id)}>
          { this.props.pic.username }
        </div>
        <div className="cursor"
          key={1111}
          onClick={this.handleFollowClick.bind(
          null, this.props.pic.user_id, followStatus)}>
          { followStatus }
        </div>
        <br></br>
        <div className="cursor"
          key={ this.props.pic.id }
          onClick={this.handleClick}>
            <img src={ this.props.pic.public_id }
                 className="picdisplay">
            </img>
        </div>
        <br></br>
          { deleteStatus }
        <br></br>
          { this.props.pic.created_at }
        <br></br>
        <br></br>
        <br></br>
      </center>
    );
  }
});

module.exports = FeedEntry;
