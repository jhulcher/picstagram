var Store = require("flux/utils").Store;
var ApiUtil = require("../util/api_util.js");
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");
var UserStore = require("./user.js");

var _pics = [];

var PicStore = new Store(AppDispatcher);

var resetPics = function (pics) {
  _pics = pics;
};

PicStore.find = function (id) {
  for (var x = 0; x < _pics.length; x++) {
    if (_pics[x].id === id) {
      return _pics[x];
    }
  }
};

PicStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
      case CONSTANTS.PICS_RECEIVED:
        resetPics(payload.pics);
        PicStore.__emitChange();
        break;
  }
};

PicStore.all = function () {
  return _pics.slice(0);
};

window.PicStore = PicStore;

module.exports = PicStore;
