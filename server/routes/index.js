
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('../app/index.html', { title: 'Express AngularJS app' });
};