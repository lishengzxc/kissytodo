define((require, exports, module) => {
  var util = {
    getStorage: (key = 'todo') => JSON.parse(localStorage.getItem(key)),
    saveStorage: (content, key = 'todo') => localStorage.setItem(key, JSON.stringify(content))
  };

  module.exports = util;
});