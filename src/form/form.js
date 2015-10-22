'use strict';

define(function (require, exports, module) {
  require('./form.css');

  var Base = require('base');
  var $ = require('node');
  var IO = require('io');

  var loading = require('../loading/loading');

  var form = Base.extend({
    initializer: function initializer() {
      this._create();
      this._bindBtnClick();
    },
    _create: function _create() {
      var tpl = this.get('tpl');
      var $target = $(tpl);
      this.set('$target', $target);
      $('body').append($target);
    },
    _bindBtnClick: function _bindBtnClick() {
      var _this = this;

      var btn = $('.form-box').children('button');
      var input = $('.form-box').children('input');
      btn.on('click', function (event) {
        event.preventDefault();
        var msg = input[0].value;
        if (!msg) return;
        _this.fire('add', { msg: msg });
        input[0].value = '';
      });
    }
  }, {
    ATTRS: {
      $target: {
        value: '',
        getter: function getter(v) {
          return $(v);
        }
      },
      tpl: {
        value: '\n          <header class="todo-header">\n            <form class="form-box">\n              <input type="text" placeholder="请输入任务..." />\n              <button><i class="fa fa-check"></i></button>\n            </form>\n          </header>\n        '
      }
    }
  });

  module.exports = form;
});