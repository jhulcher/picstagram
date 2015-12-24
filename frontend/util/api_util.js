var ApiActions = require("../actions/api_actions.js");
var UserStore = require("../stores/user.js");
var PicStore = require("../stores/pic.js");
var FolloweesStore = require("../stores/followees.js");

var ApiUtil = {

  createComment: function (id, body) {
    $.ajax({
      url: "/api/comments",
      data: { comment:
              {
                pic_id: id,
                body: body
              }
            },
      method: "POST",
      success: function (response) {
        ApiActions.receivePicFromUser(response);
      }
    });
  },

  deleteComment: function (id) {
    $.ajax({
      url: "/api/comments/" + id,
      method: "DELETE",
      success: function (response) {
        ApiActions.receivePicFromUser(response);
      }
    });
  },

  createLike: function (id) {
    $.ajax({
      url: "/api/likes",
      data: { like: {pic_id: id} },
      method: "POST",
      success: function (response) {
        ApiActions.receivePicFromUser(response);
      }
    });
  },

  deleteLike: function (id) {
    $.ajax({
      url: "/api/likes/" + id,
      method: "DELETE",
      success: function (response) {
        ApiActions.receivePicFromUser(response);
      }
    });
  },

  createPic: function (callBack, url) {
    $.ajax({
      url: "/api/pics",
      data: {pic: {public_id: url} },
      method: "POST",
      success: function (response) {
        callBack(response);
      }
    });
  },

  deletePic: function (id) {
    $.ajax({
      url: "/api/pics/" + id,
      method: "DELETE",
      success: function () {
        ApiActions.deletePic(id);
        PicStore.all();
      }
    });
  },

  fetchUsers: function () {
    $.ajax({
      url: "/api/users",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveAllUsers(response);
        UserStore.all();
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (response) {
        window.location.href = "/";
      }
    });
  },

  fetchSinglePic: function (id) {
    $.ajax({
      url: "/api/pics/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveAllPicsFromUser([response]);
        UserStore.all();
      }
    });
  },

  fetchFollowees: function () {
    $.ajax({
      url: "/api/follows",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveAllFollowees(response);
        FolloweesStore.all();
      }
    });
  },

  followUser: function (id) {
    $.ajax({
      url: "/api/follows",
      data: {follow: {followed_id: id}},
      method: "POST",
      success: function (response) {
        ApiActions.receiveAllFollowees(response);
        FolloweesStore.all();
      }
    });
  },

  unfollowUser: function (id) {
    $.ajax({
      url: "/api/follows/" + id,
      method: "DELETE",
      success: function (response) {
        ApiActions.receiveAllFollowees(response);
        FolloweesStore.all();
      }
    });
  },

  fetchFeedForUser: function () {
    $.ajax({
      url: "/api/feed",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveAllPicsFromUser(response);
        PicStore.all();
      }
    });
  },

  fetchPicsFromUser: function (id) {
    $.ajax({
      url: "/api/users/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveAllPicsFromUser(response);
        PicStore.all();
      }
    });
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
