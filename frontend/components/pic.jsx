var ApiUtil = require("../util/api_util.js");
var UserStore = require("../stores/user.js");
var React = require("react");
var PicStore = require("../stores/pic.js");
var History = require("react-router").History;
var FolloweesStore = require("../stores/followees.js");

var Pic = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
      { pic: PicStore.find(parseInt(this.props.params.id)) }
    );
  },

  componentDidMount: function () {
    ApiUtil.fetchFollowees();
    this.followListener = FolloweesStore.addListener(function () {
      this.forceUpdate();
    }.bind(this));

    ApiUtil.fetchSinglePic(this.props.params.id);
    this.listener = PicStore.addListener(function () {
      this.forceUpdate();
    }.bind(this));
  },

  render: function () {
    if (FolloweesStore.find(parseInt(PicStore.all()[0].user_id))) {
      var followStatus = "Unfollow";
    } else {
          followStatus = "Follow";
    }
    return (
      <center>
      <div key={ PicStore.all()[0].id } >
          { PicStore.all()[0].username } { followStatus }
          <br></br>
          pic id: { PicStore.all()[0].id }
          <br></br>
          { PicStore.all()[0].public_id }
          <br></br>
          { PicStore.all()[0].created_at }
        </div>
      </center>
    );
  }

});

module.exports = Pic;
