'use strict';

define(function (require, exports, module) {
  require('./loading.css');

  var $ = require('node');

  var loading = (function () {

    var tpl = '\n      <div class="loading">\n        <div></div>\n      </div>\n    ';

    var show = function show() {
      $('body').append(tpl);
    };

    var hide = function hide() {
      $('.loading').remove();
    };

    return {
      show: show,
      hide: hide
    };
  })();

  module.exports = loading;
});