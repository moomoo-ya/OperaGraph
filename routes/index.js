
/*
 * GET home page.
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
  var routes = [];
  Logs.find().distinct('route.target', function(err, nodes){
    nodes.unshift('/');
    Logs.find({}, {_id: 0, __v: 0}, function(err, docs) {

      var logs = {};
      logs['nodes'] = nodes;
      logs['logs'] = docs;
      console.log(logs);
      res.render('index', { title: 'Express', logs: logs });
    });
  });
};
