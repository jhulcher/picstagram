var ApiActions = require("../actions/api_actions.js");
var UserStore = require("../stores/user.js");
var PicStore = require("../stores/pic.js");

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
