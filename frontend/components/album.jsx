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
    if (followStatus === "Follow") {
      ApiUtil.followUser(id);
    } else {
      ApiUtil.unfollowUser(id);
    }
  },

  render: function () {
    if (typeof PicStore.all().length === "undefined") {
      return (
        <ul>
          <NavBar></NavBar>
          User has no pics yet!
        </ul>
      );
    } else {
      return (
        <ul>
          <NavBar />
            {
              this.state.pics.map (function (pic, idx) {
                if (pic.user_id !== cur) {
                  if (FolloweesStore.find(parseInt(pic.user_id))) {
                    var followStatus = "Unfollow";
                  } else {
                        followStatus = "Follow";
                  }
                }
                return (
                  <li key={idx}>
                    { pic.username }
                    <div className="cursor"
                         key={1111}
                         onClick={this.handleFollowClick.bind(
                           null,
                           pic.user_id,
                           followStatus)}>
                      { followStatus }
                    </div>
                    <AlbumEntry pic={pic}
                                key={pic.id}>
                    </AlbumEntry>
                  </li>
                );
              }.bind(this))
            }
        </ul>
      );
    }
          // this.state.pics.map (function (pic, idx) {
          //   if (PicStore.all().length === 1 &&
          //       typeof PicStore.all()[0].user_id === "number"
          //     ) {
          //     return (
          //       "User hasn't uploaded any pics yet!"
          //     );
          //   } else if (PicStore.all().length === 1) {
          //     if (pic[idx].user_id !== cur) {
          //       if (FolloweesStore.find(parseInt(pic[idx].user_id))) {
          //         var followStatus = "Unfollow";
          //       } else {
          //             followStatus = "Follow";
          //       }
          //     }
          //     return (
          //       <li key={idx} >
          //           { pic[idx].username }
          //           <div className="cursor"
          //                key={11 * idx}
          //                onClick={this.handleFollowClick.bind(
          //                null, pic[idx].user_id, followStatus)}>
          //                 { followStatus }
          //           </div>
          //           <AlbumEntry pic={pic[idx]}
          //                       key={pic[idx].id}
          //                       className="picdisplay">
          //           </AlbumEntry>
          //       </li>
          //     );
          //   } else {
          //     if (pic.user_id !== cur) {
          //       if (FolloweesStore.find(parseInt(pic.user_id))) {
          //             followStatus = "Unfollow";
          //       } else {
          //             followStatus = "Follow";
          //       }
          //     }
          //     return (
          //       <li key={idx}>
          //         { pic.username }
          //         <div className="cursor"
          //              key={1111}
          //              onClick={this.handleFollowClick.bind(
          //                null,
          //                pic.user_id,
          //                followStatus)}>
          //           { followStatus }
          //         </div>
          //         <AlbumEntry pic={pic}
          //                     key={pic.id}>
          //         </AlbumEntry>
          //       </li>
          //     );
          //   }
          // }.bind(this))
    //     }
    //   </ul>
    // );
  }
});

module.exports = Album;
