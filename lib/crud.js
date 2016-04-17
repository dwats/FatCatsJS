/**
 * @fileoverview Defines MongoDb CRUD class and subsequent properties
 * @author ejulius86@gmail.com (Eric Julius)
 */
 /* jslint node: true */
 /* jshint esversion: 6 */
'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

/**
 * Class definition for CrudAction
 * @param {object} settings information required to initialise DB connection
 * @param {string} settings.collection MongoDB collection name
 * @param {string} settings.url MongoDB url
 * @constructor
 */
class CrudAction {
  constructor(settings) {
    this.settings = settings;
    this.collection = settings.collection;
    this.url = settings.url;
  }

  /**
   * Inserts document into MongoDB collection
   * @param {object} doc Object to be inserted into collection
   */
  create(doc) {
    var self = this;

    var createDoc = function(db, callback) {
      db.collection(self.collection).insert(doc, {w:1} , function(err, result) {
          assert.equal(err, null);
          callback();
        });
    };

    MongoClient.connect(self.url, function(err, db) {
      if (err) {console.dir(err);}
      createDoc(db, function() {
        db.close();
      });
    });
  }

  read() {
    var self = this;

    var queryResult = function(db, callback) {
      var cursor = db.collection(self.collection).find().sort({_id:-1}).limit(4);
      cursor.each(function(err, doc){
        assert.equal(err, null);
        if (doc !== null) {
          console.dir(doc);
          return doc;
        } else {
          callback();
        }
      });
    };

    MongoClient.connect(self.url, function(err, db) {
      if (err) {console.dir(err);}
      queryResult(db, function() {
        db.close();
      });
    });
    return queryResult;
  }
  update() {}
  delete() {}
}
/** @export */
module.exports = CrudAction;
