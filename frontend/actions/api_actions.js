var AppDispatcher = require("../dispatcher/Dispatcher.js");
var Constants = require("../constants/constants.js");

var ApiActions = {
  receiveAllUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: Constants.USERS_RECEIVED,
      users: users
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
