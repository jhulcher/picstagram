var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var Pic = require("./pic.jsx");
var FeedEntry = require("./feed_entry.jsx");
var FolloweesStore = require("../stores/followees.js");
var Search = require("./search.jsx");
var UserStore = require("../stores/user.js");
var NavBar = require("./nav_bar.jsx");
var UploadButton = require("./upload_button.jsx");
var cur = window.current_user_id;
var History = require("react-router").History;

var Feed = React.createClass({

  mixins: [History],

  getInitialState: function () {
    return (
      { pics: [] }
    );
  },

  addToLoadAmount: function () {
    this.loadAmount += 7;
    this.forceUpdate();
  },

  componentWillMount: function () {
    ApiUtil.fetchFeedForUser();
    this.listener = PicStore.addListener(function () {
      this.setState({ pics: PicStore.all() });
    }.bind(this));

    this.loadAmount = 7;

    ApiUtil.fetchFollowees();
    this.followeesListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.followeesListener.remove();
  },

  handleUserClick: function (id) {
    this.history.pushState( null, "album", {id: id} );
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
    ApiUtil.fetchFeedForUser();
  },

  render: function () {
    if (this.loadAmount < PicStore.all().length - 1) {
      var loadMoreButton = <div>
                             <div className="cursor load_more"
                                  onClick={this.addToLoadAmount}>
                                  <h5 className="load_more_text">
                                    Load More
                                  </h5>
                             </div>
                             <div className="bottom_pad"></div>
                           </div>;
    } else {
          loadMoreButton = <div className="bottom_pad"></div>;
    }
    if (PicStore.all().length === 0) {
      return (
        <ul>
          <NavBar></NavBar>
          <div className="feed_entry_pad">
          </div>
          <div className="feed_entry_pad">
          </div>
          <li className="top_pad">
            The users you're following haven't uploaded any pics yet!
          </li>
          <li className="top_pad">
            You can find other users by using the search field.
          </li>
          <li className="top_pad">
            Follow more users to jump-start your feed!
          </li>
          <li className="top_pad">
            <i className="no_pics_icon fa fa-picture-o"></i>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <NavBar></NavBar>
          {
            this.state.pics.map (function (pic, idx) {
              if (this.loadAmount >= idx) {
                if (pic.user_id === cur) {
                  var followStatus = "";
                } else if (FolloweesStore.find(parseInt(pic.user_id))) {
                      followStatus = "unfollow";
                } else {
                      followStatus = "follow";
                }
                return (
                  <li key={idx} className="feed_entry_pad">
                    <center>
                      <div className="album_header">
                        <div className="cursor feed_username"
                             onClick={
                               this.handleUserClick.bind(null, pic.user_id)
                             }>
                            { pic.username }
                        </div>
                        <div className="cursor feed_follow_delete"
                             key={1111}
                             onClick={this.handleFollowClick.bind(
                             null, pic.user_id, followStatus)}>
                              { followStatus }
                        </div>
                      </div>
                      <FeedEntry pic={ pic }> </FeedEntry>
                    </center>
                  </li>
                );
              }
            }.bind(this))
          }
          { loadMoreButton }
        </ul>
      );
    }
  }
});

module.exports = Feed;
