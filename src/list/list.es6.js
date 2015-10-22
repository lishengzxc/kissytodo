define((require, exports, module) => {
  require('./list.css');

  var Base = require('base');
  var $ = require('node');
  var IO = require('io');

  var loading = require('../loading/loading');

  var list = Base.extend({
    initializer: function () {
      this._create();
      this.renderData();
      this._bindRremove();
    },
    _create: function () {
      var tpl = this.get('tpl');
      var $target = $(tpl);
      this.set('$target', $target);
      $('body').append($target);
    },
    renderData: function () {
      //var list = Util.getStorage();
      loading.show();
      IO.getJSON('http://127.0.0.1:3000/todo').then((resule) => {
        var list = resule[0];
        var item = '';
        for (let [i, v] of list.entries()) {
          item += `
          <li class="task-item">
            <p class="task-item-content">${v}</p>
            <i class="over fa fa-check-circle-o" data-item-id=${i}></i>
          </li>
        `;
        }
        $('.task-list')[0].innerHTML = item;
        loading.hide();
      });
    },
    receive: function (msg) {
      loading.show();
      IO.post('http://127.0.0.1:3000/todo', {todo: msg}).then((data) => {
        loading.hide();
        var index = !$('.task-list').last() ? 0 : +$('.task-list').last().find('li>i').attr('data-item-id') + 1;
        var item = `
          <li class="task-item">
            <p class="task-item-content">${msg}</p>
            <i class="over fa fa-check-circle-o" data-item-id=${index}></i>
          </li>
        `;
        $('.task-list').append(item);
        $('.task-list')[0].lastChild.scrollIntoView();
      });
    },
    _bindRremove: function () {
      $('.task-list').on('click', (event) => {
        loading.show();
        var id = $(event.target).attr('data-item-id');
        IO({
          type: 'DELETE',
          url: 'http://127.0.0.1:3000/todo/' + id
        }).then((data) => {
          return IO.getJSON('http://127.0.0.1:3000/todo').then((resule) => {
            var list = resule[0];
            var item = '';
            for (let [i, v] of list.entries()) {
              item += `
                <li class="task-item">
                  <p class="task-item-content">${v}</p>
                  <i class="over fa fa-check-circle-o" data-item-id=${i}></i>
                </li>
              `;
            }
            $('.task-list')[0].innerHTML = item;
            loading.hide();
          });
        });
      })
    }
  }, {
    ATTRS: {
      $target: {
        value: '',
        getter: v => $(v)
      },
      tpl: {
        value: `
          <main class="todo-main">
            <ul class="task-list"></ul>
          </main>
        `
      },
      item: {
        value: `
          <li class="task-item">
            <p class="task-item-content">asd</p>
            <i class="over fa fa-check-circle-o"></i>
          </li>
        `
      }
    }
  });

  module.exports = list;
});