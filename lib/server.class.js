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
    var Schema = mongoose.Schema;
    var feeding = new Schema({
        datetime : {type: Date, required: true},
        food : {type: String, required: true},
        amount : {type: String, required: true}
      });
    var catfood = new Schema({
        brand : {type : String, required: true},
        name : {type : String, required: true},
        consistency : {type : String, required: true},
        kcal : {type : Number, required: true},
        measurement : {type : String, required: true}
      });
    var Feedings = mongoose.model('feeding', feeding,'feedings');
    var CatFoods = mongoose.model('catfood', catfood, 'catfood');

    //GET feedings
    app.get('/api/feedings', function(req, res){
      Feedings.find().sort({"datetime":-1}).exec(function(err, feedings) {
        if (err) {
          res.status(500).send("Something went wrong!\n" + err);
        } else {
          res.json(feedings);
        }
      });
    });

    //GET catfoods
    app.get('/api/catfoods', function(req, res){
      CatFoods.find(function(err, catfood) {
        if (err) {
          res.status(500).send("Something went wrong!\n" + err);
        } else {
          res.json(catfood);
        }
      });
    });

    //PUT
    app.put('/api/feedings/:id', function(req, res) {
      return Feedings.findById(req.params.id, function(err, feeding) {
        console.dir(req.params);
        feeding.food = req.body.food;
        feeding.amount = req.body.amount;
        return feeding.save(function (err) {
          if (err) {
            res.status(500).send("Something went wrong!\n" + err);
          } else {
            console.log("PUT success");
          }
          return res.send(feeding);
        });
      });
    });

    //POST feeding
    app.post('/api/feedings', function(req, res) {
      var feeding;
      console.log("POST: ");
      console.log(req.body);
      feeding = new Feedings({
        datetime : req.body.datetime,
        food : req.body.food,
        amount : req.body.amount
      });
      feeding.save(function (err) {
        if (err) {
          res.status(500).send("Something went wrong!\n" + err);
        } else {
          console.log("POST success");
        }
      });
      return res.send(feeding);
    });

    //DELETE
    app.delete('/api/feedings/:id', function(req, res){
      return Feedings.findById(req.params.id, function(err, feeding) {
        return feeding.remove(function(err) {
          if (err) {
            res.status(500).send("Something went wrong!\n" + err);
          } else {
            console.log("DELETE success");
            return res.send('');
          }
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


  }
}

module.exports = HttpServer;
