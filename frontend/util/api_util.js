var ApiActions = require("../actions/api_actions.js");
var UserStore = require("../stores/user.js");
var PicStore = require("../stores/pic.js");
var FolloweesStore = require("../stores/followees.js");

var ApiUtil = {
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

  fetchSinglePic: function (id) {
    $.ajax({
      url: "api/pics/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveAllPicsFromUser(response);
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
