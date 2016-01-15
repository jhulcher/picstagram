var ApiUtil = require("../util/api_util.js");
var PicStore = require("../stores/pic.js");
var React = require("react");
var AlbumEntry = require("./album_entry.jsx");
var FolloweesStore = require("../stores/followees.js");
var UserStore = require("../stores/user.js");
var NavBar = require("./nav_bar.jsx");
var UploadButton = require("./upload_button.jsx");
var cur = window.current_user_id;

var Album = React.createClass({

  getInitialState: function () {
    return (
        { pics: [] }
    );
  },

  addToLoadAmount: function () {
    this.loadAmount += 7;
    this.forceUpdate();
  },

  componentDidMount: function () {
    ApiUtil.fetchPicsFromUser(parseInt(this.props.location.query.id));
    this.listener = PicStore.addListener(function () {
      this.setState({ pics: PicStore.all() });
    }.bind(this));

    this.loadAmount = 7;

    ApiUtil.fetchFollowees();
    this.followListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchPicsFromUser(parseInt(this.props.location.query.id));
    this.setState({ pics: PicStore.all() });
    this.loadAmount = 7;
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.followListener.remove();
  },

  handleFollowClick: function (id, followStatus) {
    if (followStatus === "follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  handleLikeClick: function (likeStatus, id) {
    if (likeStatus === false) {
      ApiUtil.createLike(id);
    } else {
      ApiUtil.deleteLike(id);
    }
  },

  render: function () {
    if (this.loadAmount < PicStore.all().length - 1) {
      var loadMoreButton = <div>
                             <div className="cursor load_more"
                                  onClick={this.addToLoadAmount}
                                  >
                                  <h5 className="load_more_text">
                                    Load More
                                  </h5>
                             </div>
                             <div className="bottom_pad"></div>
                           </div>;
    } else {
          loadMoreButton = <div className="bottom_pad"></div>;
    }
    if (typeof PicStore.all().length === "undefined") {
      if (PicStore.all().user_id !== cur) {
        if (FolloweesStore.find(parseInt(PicStore.all().user_id))) {
          var followStatus = <div className="cursor album_follow_delete"
                                  key={1111}
                                  onClick={
                                     this.handleFollowClick.bind(
                                       null,
                                       PicStore.all().user_id,
                                       "unfollow")}>
                               unfollow
                             </div>;
          var followSentence = "You're following " +
                PicStore.all().username + "!";
        } else {
              followStatus = <div className="cursor album_follow"
                                  key={1111}
                                  onClick={
                                     this.handleFollowClick.bind(
                                       null,
                                       PicStore.all().user_id,
                                       "follow")}>
                               follow
                             </div>;
              followSentence = "You're not following " +
              PicStore.all().username;
        }
      }
      return (
        <ul>
          <NavBar></NavBar>
          <li key={1} className="album_top_pad">
            <div className="album_header_div">
              <div className="album_username">
                { PicStore.all().username + "'s album"}
              </div>
              <div className="average_text">
                { followStatus }
              </div>
            </div>
            <br></br>
            <div className="album_text">
              <div className="album_user_since">
                User since { PicStore.all().user_since }
              </div>
            </div>
            <br></br>
            <div className="album_text">
              <div className="album_follow_text">
                { followSentence }
              </div>
            </div>
          </li>
          <li>
            <div className="feed_entry_pad">
            </div>
            User hasn't uploaded any pics yet!
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
                  if (pic.user_id !== cur) {
                    if (FolloweesStore.find(parseInt(pic.user_id))) {
                          followStatus = <div className="cursor
                                                         album_follow_delete"
                                              key={1111}
                                              onClick={
                                                 this.handleFollowClick.bind(
                                                   null,
                                                   pic.user_id,
                                                   "unfollow")}>
                                           unfollow
                                         </div>;
                        followSentence = "You're following " +
                                          pic.username + "!";
                    } else {
                          followStatus = <div className="cursor album_follow"
                                              key={1111}
                                              onClick={
                                                 this.handleFollowClick.bind(
                                                   null,
                                                   pic.user_id,
                                                   "follow")}>
                                           follow
                                         </div>;
                          followSentence = "You're not following " +
                                            pic.username;
                    }
                  } else {
                    followSentence = "This is your album";
                  }
                  if (pic.already_liked === true) {
                    var likeStatus = <h4 className="cursor"
                                         onClick={this.handleLikeClick.bind(
                                           null,
                                           pic.already_liked,
                                           pic.id)}>
                                              Unlike
                                     </h4>;
                  } else {
                        likeStatus = <h4 className="cursor"
                                         onClick={this.handleLikeClick.bind(
                                           null,
                                           pic.already_liked,
                                           pic.id)}>
                                              Like
                                     </h4>;
                  }
                  if (idx === 0) {
                    return (
                      <li key={idx} className="album_top_pad">
                        <div className="album_header_div">
                          <div className="album_username">
                            { pic.username + "'s album"}
                          </div>
                          <div className="average_text">
                            { followStatus }
                          </div>
                        </div>
                        <br></br>
                        <div className="album_text">
                          <div className="album_user_since">
                            User since { pic.user_since }
                          </div>
                        </div>
                        <br></br>
                        <div className="album_text">
                          <div className="album_follow_text">
                            { followSentence }
                          </div>
                        </div>
                        <AlbumEntry pic={pic}
                                    key={pic.id}>
                        </AlbumEntry>
                      </li>
                    );
                  } else {
                    return (
                      <li key={idx} className="feed_entry_pad">
                        <AlbumEntry pic={pic}
                                    key={pic.id}>
                        </AlbumEntry>
                      </li>
                    );
                  }
                }
              }.bind(this))
            }
            { loadMoreButton }
        </ul>
      );
    }
  }
});

module.exports = Album;
