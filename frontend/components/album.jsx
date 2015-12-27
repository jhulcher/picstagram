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

  componentDidMount: function () {
    ApiUtil.fetchPicsFromUser(parseInt(this.props.location.query.id));
    this.listener = PicStore.addListener(function () {
      this.setState({ pics: PicStore.all() });
    }.bind(this));

    ApiUtil.fetchFollowees();
    this.followListener = FolloweesStore.addListener(function () {
      this.setState({ followees: FolloweesStore.all() });
    }.bind(this));
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchPicsFromUser(parseInt(this.props.location.query.id));
    this.setState({ pics: PicStore.all() });
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
    if (typeof PicStore.all().length === "undefined") {
      if (PicStore.all().user_id !== cur) {
        if (FolloweesStore.find(parseInt(PicStore.all().user_id))) {
          var followStatus = <div className="cursor albumfollow
                                             right deletex"
                                  key={1111}
                                  onClick={
                                     this.handleFollowClick.bind(
                                       null,
                                       PicStore.all().user_id,
                                       "unfollow")}>
                               unfollow
                             </div>;
        } else {
              followStatus = <div className="cursor albumfollow
                                             right addfollow"
                                  key={1111}
                                  onClick={
                                     this.handleFollowClick.bind(
                                       null,
                                       PicStore.all().user_id,
                                       "follow")}>
                               follow
                             </div>;
        }
      }
      return (
        <ul>
          <NavBar></NavBar>
          <li key={1} className="albumtop">
            <div className="albumheaderwidth albumcomments">
              <div className="useralbumtitle commentleft">
                { PicStore.all().username + "'s album"}
              </div>
              <div className="average-text">
                { followStatus }
              </div>
            </div>
            <br></br>
            <div className="albumwidth albumcomments">
              <div className="albumcomments average-text
                              commentleft albumentrypad">
                User since { PicStore.all().user_since }
              </div>
            </div>
          </li>
          <li>
            <div className="feedentrypad">
            </div>
            User hasn't uploaded any pics yet!
          </li>
          <li className="top_pad">
            <i className="bigimage fa fa-picture-o"></i>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <NavBar></NavBar>
            {
              this.state.pics.map (function (pic, idx) {
                if (pic.user_id !== cur) {
                  if (FolloweesStore.find(parseInt(pic.user_id))) {
                    var followStatus = <div className="cursor albumfollow
                                                       right deletex"
                                            key={1111}
                                            onClick={
                                               this.handleFollowClick.bind(
                                                 null,
                                                 pic.user_id,
                                                 "unfollow")}>
                                         unfollow
                                       </div>;
                  } else {
                        followStatus = <div className="cursor albumfollow
                                                       right addfollow"
                                            key={1111}
                                            onClick={
                                               this.handleFollowClick.bind(
                                                 null,
                                                 pic.user_id,
                                                 "follow")}>
                                         follow
                                       </div>;
                  }
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
                    <li key={idx} className="albumtop">
                      <div className="albumheaderwidth albumcomments">
                        <div className="useralbumtitle commentleft">
                          { pic.username + "'s album"}
                        </div>
                        <div className="average-text">
                          { followStatus }
                        </div>
                      </div>
                      <br></br>
                      <div className="albumwidth albumcomments">
                        <div className="albumcomments average-text
                                        commentleft albumentrypad">
                          User since { pic.user_since }
                        </div>
                      </div>
                      <AlbumEntry pic={pic}
                                  key={pic.id}>
                      </AlbumEntry>
                    </li>
                  );
                } else {
                  return (
                    <li key={idx} className="feedentrypad">
                      <AlbumEntry pic={pic}
                                  key={pic.id}>
                      </AlbumEntry>
                    </li>
                  );
                }
              }.bind(this))
            }
        </ul>
      );
    }
  }
});

module.exports = Album;
