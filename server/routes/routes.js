var index = require('./index');
var user = require('./user');
var demo = require('./examples/demo');

module.exports = function (app) {
  app.get('/', index.index);
  app.get('/users', user.list);
  app.get('/examples', demo.index);
  app.get('/examples/demo', demo.list);
};