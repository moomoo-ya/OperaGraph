
/*
 * LOG page.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
  route: {
    source: String,
    target: String
  },
  obj: {
    tag: String,
    id: String,
    name: String
  },
  time: Date
});
var mongodb = mongoose.createConnection('mongodb://localhost/oplog');
var Logs = mongodb.model('Log', LogSchema);

exports.index = function(req, res){
  res.render('index', { title: 'log' });
};

exports.rec = function(req, res) {
  var log = new Logs();
  log['route']['source'] = req.param('source') || '';
  log['route']['target'] = req.param('target') || '';
  log['obj']['tag'] = req.param('tag') || '';
  log['obj']['id'] = req.param('id') || '';
  log['obj']['name'] = req.param('name') || '';
  log['time'] = new Date();
  log.save(function(err) {
    var obj = {};
    if (err) {
      obj['result'] = 'Failure: log not saved.';
    } else {
      obj['result'] = 'Success: log saved.';
      obj['title'] = 'rec';
      obj['location'] = req.param('location');
      obj['dest'] = req.param('dest');
    }
    res.jsonp(obj);
  });
};
