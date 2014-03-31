var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.connectionurl);

var db = mongoose.connection;
db.on('error', function (err) {
  console.error('connect to %s error: ', config.connectionurl, err.message);
  console.error.bind(console, 'connection error.')
  process.exit(1);
});
db.once('open', function () {
  log.success('%s has been connected.', config.connectionurl);
});

exports.mongoose = mongoose;