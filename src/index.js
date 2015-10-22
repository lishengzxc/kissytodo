'use strict';

define(function (require) {
  require('./index.css');

  var Form = require('./form/form');
  var List = require('./list/list');

  var form = new Form();
  var list = new List();

  form.on('add', function (event) {
    list.receive(event.msg);
  });
});