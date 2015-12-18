var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _followees = [];

var FolloweesStore = new Store(AppDispatcher);

var resetFollowees = function (followees) {
  _followees = followees;
};

FolloweesStore.find = function (id) {
  for (var x = 0; x < _followees.length; x++) {
    if (_followees[x].id === id) {
      return _followees[x];
    }
  }
};

FolloweesStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CONSTANTS.FOLLOWEES_RECEIVED:
      resetFollowees(payload.followees);
      FolloweesStore.__emitChange();
      break;
  }
};

FolloweesStore.all = function () {
  return _followees.slice(0);
};

window.FolloweesStore = FolloweesStore;

module.exports = FolloweesStore;
