function CrudAction(settings) {
  var MongoClient = require('mongodb').MongoClient;
  var ObjectId = require('mongodb').ObjectID;
  var assert = require('assert');
  this.settings = settings;
  this.collection = settings.collection;
  this.url = settings.url;

  this.insertDocument = function(doc) {
    var collection = this.collection
    var insertDocument = function(db, callback) {
      db.collection(collection).insertOne(
        doc,
        function(err, result) {
          assert.equal(err, null);
          console.log('+1 ' + doc.datetime);
          callback();
        });
    };

    MongoClient.connect(this.url, function(err, db) {
      assert.equal(null, err);
      insertDocument(db, function() {
        db.close();
      });
    });
  };

  this.read = function() {};
  this.update = function() {};
  this.delete = function() {};

  return this;
}

module.exports = CrudAction;
