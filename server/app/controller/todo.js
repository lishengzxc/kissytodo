var fs = require('fs');
var Q = require('q');

var read = function (callback) {
  var deferred = Q.defer();
  fs.readFile(process.cwd() + '/data.json', {encoding: 'utf8'}, function (err, data) {
    if (err)
      deferred.reject(err);
    else
      deferred.resolve(data);
  });
  return deferred.promise.nodeify(callback);
};

var write = function (data, callback) {
  var deferred = Q.defer();
  fs.writeFile(process.cwd() + '/data.json', JSON.stringify(data), function (err) {
    if (err)
      deferred.reject(err);
    else
      deferred.resolve();
  });
  return deferred.promise.nodeify(callback);
};

exports.fetch = function (req, res) {
  read().then(function (data) {
    setTimeout(function () {
      res.send(data);
    }, 200);
  });
};

exports.del = function (req, res) {
  read().then(function (data) {
    var list = JSON.parse(data);
    list.splice(req.params.id, 1);
    return write(list);
  }).then(function () {
    setTimeout(function () {
      res.send({
        status: 1
      });
    }, 200);
  });
};

exports.add = function (req, res) {
  read().then(function (data) {
    var list = JSON.parse(data);
    list.push(req.body.todo);
    return write(list);
  }).then(function () {
    setTimeout(function () {
      res.send({
        status: 1
      });
    }, 200);
  });
};