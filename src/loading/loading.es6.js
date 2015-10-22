define((require, exports, module) => {
  require('./loading.css');

  var $ = require('node');

  var loading = (function () {

    var tpl = `
      <div class="loading">
        <div></div>
      </div>
    `;

    var show = () => {
      $('body').append(tpl);
    };

    var hide = () => {
      $('.loading').remove();
    };

    return {
      show: show,
      hide: hide
    };
  }());

  module.exports = loading;
});