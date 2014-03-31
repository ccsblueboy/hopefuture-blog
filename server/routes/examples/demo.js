
var demoDao = require('./../../dao/examples/DemoDao.js');
var demo = {
  index: function (req, res) {
    res.render('demo', { title: 'This is an Example.'});
  },

  list: function (req, res) {
    demoDao.list(function (err, obj) {
      res.send(obj);
    });
  }
};

module.exports = demo;