define((require, exports, module) => {
  require('./form.css');

  var Base = require('base');
  var $ = require('node');
  var IO = require('io');


  var loading = require('../loading/loading');

  var form = Base.extend({
    initializer: function () {
      this._create();
      this._bindBtnClick();
    },
    _create: function () {
      var tpl = this.get('tpl');
      var $target = $(tpl);
      this.set('$target', $target);
      $('body').append($target);
    },
    _bindBtnClick: function () {
      var btn = $('.form-box').children('button');
      var input = $('.form-box').children('input');
      btn.on('click', (event) => {
        event.preventDefault();
        var msg = input[0].value;
        if (!msg) return;
        this.fire('add', {msg: msg});
        input[0].value = '';
      });
    }
  }, {
    ATTRS: {
      $target: {
        value: '',
        getter: v => $(v)
      },
      tpl: {
        value: `
          <header class="todo-header">
            <form class="form-box">
              <input type="text" placeholder="请输入任务..." />
              <button><i class="fa fa-check"></i></button>
            </form>
          </header>
        `
      }
    }
  });

  module.exports = form;
});