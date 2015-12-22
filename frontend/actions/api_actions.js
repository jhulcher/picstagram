var AppDispatcher = require("../dispatcher/Dispatcher.js");
var Constants = require("../constants/constants.js");

var ApiActions = {
  receiveAllUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: Constants.USERS_RECEIVED,
      users: users
    });
  },

  receiveAllFollowees: function (followees) {
    AppDispatcher.dispatch({
      actionType: Constants.FOLLOWEES_RECEIVED,
      followees: followees
    });
  },

  receivePicFromUser: function (pic) {
    AppDispatcher.dispatch({
      actionType: Constants.PIC_RECEIVED,
      pic: pic
    });
  },

  deletePic: function (id) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_PIC,
      id: id
    });
  },

  receiveAllPicsFromUser: function (pics) {
    AppDispatcher.dispatch({
      actionType: Constants.PICS_RECEIVED,
      pics: pics
    });
  }
};

module.exports = ApiActions;
