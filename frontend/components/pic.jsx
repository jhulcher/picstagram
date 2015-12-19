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

  componentWillMount: function () {
    ApiUtil.fetchPicsFromUser(parseInt(this.props.location.query.id));
    this.listener = PicStore.addListener(function () {
      this.setState({ pic: PicStore.find(parseInt(this.props.params.id)) });
    }.bind(this));

    ApiUtil.fetchFollowees();
    this.followListener = FolloweesStore.addListener(function () {
      this.forceUpdate();
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.followListener.remove();
  },

  render: function () {
    // console.log(this.state.pic);
    if (FolloweesStore.find(parseInt(this.state.pic.user_id))) {
      var followStatus = "Unfollow";
    } else {
          followStatus = "Follow";
    }
    // return empty div if pic is undefined
    return (
      <center>
      <div key={ this.state.pic.id } >
          { this.state.pic.username } { followStatus }
          <br></br>
          pic id: { this.state.pic.id }
          <br></br>
          { this.state.pic.publics_id }
          <br></br>
          { this.state.pic.created_at }
        </div>
      </center>
    );
  }

});

module.exports = Pic;
