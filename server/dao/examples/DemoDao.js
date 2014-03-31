function DemoDao(Model) {
  this.model = Model;
}

//create
DemoDao.prototype.save = function (doc, callback) {
  this.model.create(doc, function (error) {
    if (error) return callback(error);
    return callback(doc);
  });
};


DemoDao.prototype.findById = function (id, callback) {
  this.model.findOne({_id: id}, function (error, model) {
    if (error) return callback(error, null);
    return callback(null, model);
  });
};


DemoDao.prototype.list = function (callback) {
  this.model.find({}, function (error, model) {
    if (error) return callback(error, null);
    return callback(null, model);
  });
};

DemoDao.prototype.delete = function (query, callback) {
  this.model.remove(query, function (error) {
    if (error) return callback(error);

    return callback(null);
  });
};


DemoDao.prototype.update = function (conditions, update, options, callback) {
  this.model.update(conditions, update, options, function (error) {
    if (error) return callback(error);
    return callback(null);
  });
};

module.exports = DemoDao;