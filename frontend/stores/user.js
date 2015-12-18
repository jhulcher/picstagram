var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _users = [];

var UserStore = new Store(AppDispatcher);

var resetUsers = function (users) {
  _users = users;
};

UserStore.find = function (id) {
  for (var x = 0; x < _users.length; x++) {
    if (_users[x].id === id) {
      return _users[x];
    }
  }
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CONSTANTS.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
  }
};

UserStore.all = function () {
  return _users.slice(0);
};

window.UserStore = UserStore;

module.exports = UserStore;
