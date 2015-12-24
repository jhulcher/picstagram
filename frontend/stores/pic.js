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
      case CONSTANTS.PIC_RECEIVED:
        var slot = 0;
        var array = [];
        _pics.forEach (function (pic, idx) {
          if (payload.pic.id === pic.id) {
            array.push(payload.pic);
            slot = idx;
          } else {
            array.push(pic);
          }
        });
        _pics = array;
        PicStore.__emitChange();
        break;
      case CONSTANTS.DELETE_PIC:
        _pics.forEach (function (pic, idx) {
          if (payload.id === pic.id) {
            _pics.splice(idx, 1);
          }
        });
        PicStore.__emitChange();
        break;
  }
};

PicStore.all = function () {
  if (_pics.length > 1) {
    return _pics.slice(0);
  } else {
    return _pics;
  }
};

window.PicStore = PicStore;

module.exports = PicStore;
