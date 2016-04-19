/* jslint node: true */
/* jshint esversion: 6 */
'use strict';
var express  = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/**
 * Class definition for httpServer
 * @constructor
 * TODO finish commenting
 */
class HttpServer {

  constructor(settings){
    this.url = settings.url;
    this.path = settings.path;
  }

  /**
   * Prepare and start httpServer app
   * TODO finish commenting
   */
  run() {
    var self = this;
    mongoose.connect(self.url);

    app.use(express.static(self.path + '/public'));               // set the static files location
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    self.defineAPI();
    self.defineRoute();
    /**
     * Start App and listen on given port
     */
    app.listen(8080, function(){
      console.log("FatCatsJS HTTP listening on port 8080");
    });

  }

  defineAPI() {
    var FatCats = mongoose.model('feeding', {
      datetime : {type: Date, required: true}
    },'feedings');

    var CatFood = mongoose.model('catfood', {
      brand : {type : String},
      name : {type : String},
      consistency : {type : String},
      kcal : {type : Number},
      measurement : {type : String}
    }, 'catfood');
    //GET
    app.get('/api/feedings', function(req, res){
      FatCats.find().sort({"datetime":-1}).exec(function(err, feedings) {
        if (err) {
          res.send(err);
        }
        res.json(feedings);
      });
    });
    app.get('/api/catfood', function(req, res){
      CatFood.find(function(err, catfood) {
        if (err) {
          res.send(err);
        }
        res.json(catfood);
      });
    });

    //POST
    app.post('/api/feedings', function(req, res) {
      FatCats.create({
        datetime : req.body.text,
        type : req.body.text,
        amount : req.body.text
      }, function(err, feeding) {
        if (err) {
          res.send(err);
        }
        FatCats.find(function(err, feedings) {
          if (err){
            res.send(err);
          }
          res.json(feedings);
        });
      });
    });

    //DELETE
    app.delete('/api/feedings/:feeding_id', function(req, res){
      FatCats.remove({
        _id : req.params.feeding_id
      }, function(err, todo) {
        if (err) {
          res.send(err);
        }
        FatCats.find(function(err, feedings){
          if (err) {
            res.send(err);
          }
          res.json(feedings);
        });
      });
    });
  }

  defineRoute() {
    var self = this;

    router.use(function (req,res,next) {
      console.log("/" + req.method);
      next();
    });

    router.get("/",function(req,res){
      res.sendFile("/public/index.html" , {root : self.path});
    });

    app.use("/",router);

    app.use("*",function(req,res){
      res.sendFile("public/404.html", {root : self.path});
    });
  }
}

module.exports = HttpServer;
