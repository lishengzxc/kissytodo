'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

define(function (require, exports, module) {
  require('./list.css');

  var Base = require('base');
  var $ = require('node');
  var IO = require('io');

  var loading = require('../loading/loading');

  var list = Base.extend({
    initializer: function initializer() {
      this._create();
      this.renderData();
      this._bindRremove();
    },
    _create: function _create() {
      var tpl = this.get('tpl');
      var $target = $(tpl);
      this.set('$target', $target);
      $('body').append($target);
    },
    renderData: function renderData() {
      //var list = Util.getStorage();
      loading.show();
      IO.getJSON('http://127.0.0.1:3000/todo').then(function (resule) {
        var list = resule[0];
        var item = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = list.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var i = _step$value[0];
            var v = _step$value[1];

            item += '\n          <li class="task-item">\n            <p class="task-item-content">' + v + '</p>\n            <i class="over fa fa-check-circle-o" data-item-id=' + i + '></i>\n          </li>\n        ';
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        $('.task-list')[0].innerHTML = item;
        loading.hide();
      });
    },
    receive: function receive(msg) {
      loading.show();
      IO.post('http://127.0.0.1:3000/todo', { todo: msg }).then(function (data) {
        loading.hide();
        var index = !$('.task-list').last() ? 0 : +$('.task-list').last().find('li>i').attr('data-item-id') + 1;
        var item = '\n          <li class="task-item">\n            <p class="task-item-content">' + msg + '</p>\n            <i class="over fa fa-check-circle-o" data-item-id=' + index + '></i>\n          </li>\n        ';
        $('.task-list').append(item);
        $('.task-list')[0].lastChild.scrollIntoView();
      });
    },
    _bindRremove: function _bindRremove() {
      $('.task-list').on('click', function (event) {
        loading.show();
        var id = $(event.target).attr('data-item-id');
        IO({
          type: 'DELETE',
          url: 'http://127.0.0.1:3000/todo/' + id
        }).then(function (data) {
          return IO.getJSON('http://127.0.0.1:3000/todo').then(function (resule) {
            var list = resule[0];
            var item = '';
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = list.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _slicedToArray(_step2.value, 2);

                var i = _step2$value[0];
                var v = _step2$value[1];

                item += '\n                <li class="task-item">\n                  <p class="task-item-content">' + v + '</p>\n                  <i class="over fa fa-check-circle-o" data-item-id=' + i + '></i>\n                </li>\n              ';
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            $('.task-list')[0].innerHTML = item;
            loading.hide();
          });
        });
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
        value: '\n          <main class="todo-main">\n            <ul class="task-list"></ul>\n          </main>\n        '
      },
      item: {
        value: '\n          <li class="task-item">\n            <p class="task-item-content">asd</p>\n            <i class="over fa fa-check-circle-o"></i>\n          </li>\n        '
      }
    }
  });

  module.exports = list;
});