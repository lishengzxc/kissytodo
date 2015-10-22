'use strict';

define(function (require, exports, module) {
  var util = {
    getStorage: function getStorage() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? 'todo' : arguments[0];
      return JSON.parse(localStorage.getItem(key));
    },
    saveStorage: function saveStorage(content) {
      var key = arguments.length <= 1 || arguments[1] === undefined ? 'todo' : arguments[1];
      return localStorage.setItem(key, JSON.stringify(content));
    }
  };

  module.exports = util;
});