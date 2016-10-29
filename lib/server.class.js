'use strict';

// TODO Good god, add promises to all DB interactions.
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const router = express.Router();
let server;

/**
 * Class definition for httpServer
 * @constructor
 * TODO finish commenting
 */
class HttpServer {

  constructor(settings) {
    this.url = settings.url;
    this.path = settings.path;
  }

  /**
   * Prepare and start httpServer app
   * TODO finish commenting
   */
  run() {
    const self = this;
    const path = `${self.path}/public`;

    mongoose.connect(self.url);
    app.use(express.static(path)); // set the static files location
    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.urlencoded({
      extended: 'true'
    })); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({
      type: 'application/vnd.api+json'
    })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    self.defineAPI();
    self.defineRoute();

    /**
     * Start App and listen on given port
     */
    server = app.listen(8080, () => {
      console.log('FatCatsJS HTTP listening on port 8080');
    });

  }

  defineAPI() {
    const Schema = mongoose.Schema;
    const feeding = new Schema({
      datetime: {
        type: Date,
        required: true
      },
      food: {
        type: String,
        required: true
      },
      amount: {
        type: String,
        required: true
      }
    });
    const catfood = new Schema({
      brand: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      consistency: {
        type: String,
        required: true
      },
      kcal: {
        type: Number,
        required: true
      },
      measurement: {
        type: String,
        required: true
      }
    });
    const litter = new Schema({
      datetime: {
        type: Date,
        required: true
      }
    });
    const Feedings = mongoose.model('feeding', feeding, 'feedings');
    const CatFoods = mongoose.model('catfood', catfood, 'catfood');
    const LitterMdl = mongoose.model('litter', litter, 'litters');

    // GET feedings
    app.get('/api/feedings', (req, res) => {
      Feedings.find().sort({
        datetime: -1
      }).exec((err, feedings) => {
        if (err) {
          res.status(500).send(`Something went wrong!\n ${err}`);
        }
        else {
          res.json(feedings);
        }
      });
    });

    // GET catfoods
    app.get('/api/catfoods', (req, res) => {
      CatFoods.find((err, food) => {
        if (err) {
          res.status(500).send(`Something went wrong!\n ${err}`);
        }
        else {
          res.json(food);
        }
      });
    });

    // PUT feedings
    app.put('/api/feedings/:id', (req, res) =>
      Feedings.findById(req.params.id, (err, thisFeeding) => {
        console.dir(req.params);
        thisFeeding.food = req.body.food;
        thisFeeding.amount = req.body.amount;
        return thisFeeding.save((saveErr) => {
          if (err) {
            res.status(500).send(`Something went wrong!\n ${saveErr}`);
          }
          else {
            console.log('PUT success');
          }
          return res.send(thisFeeding);
        });
      })
    );

    // POST feeding
    app.post('/api/feedings', (req, res) => {
      console.log('POST: ');
      console.log(req.body);
      const newFeeding = new Feedings({
        datetime: req.body.datetime,
        food: req.body.food,
        amount: req.body.amount
      });
      newFeeding.save((err) => {
        if (err) {
          res.status(500).send(`Something went wrong!\n ${err}`);
        }
        else {
          console.log('POST success');
        }
      });
      return res.send(newFeeding);
    });

    // GET Litter Cleanings
    app.get('/api/litters', (req, res) => {
      LitterMdl.find()
        .sort({
          datetime: -1
        })
        .exec((err, litters) => {
          if (err) {
            res.status(500).send(`Something went wrong!\n ${err}`);
          }
          else {
            res.json(litters);
          }
        });
    });

    // POST Litter Cleaning
    app.post('/api/litter', (req, res) => {
      console.log('POST: ');
      console.log(req.body);
      const newLitter = new LitterMdl({
        datetime: req.body.datetime
      });
      newLitter.save((err) => {
        if (err) {
          res.status(500).send(`Something went wrong!\n ${err}`);
        }
        else {
          console.log('POST success');
        }
        return res.send(newLitter);
      });
    });

    // DELETE feeding
    app.delete('/api/feedings/:id', (req, res) =>
      Feedings.findById(req.params.id, (err, thisFeeding) =>
        thisFeeding.remove((feedingErr) => {
          if (err) {
            return res.status(500).send(`Something went wrong!\n ${feedingErr}`);
          }
          console.log('DELETE success');
          return res.send('');
        })
      )
    );

    // GET Close Server
    app.get('/api/quit', (req, res) => {
      res.send('Shutting down...');
      server.close();
    });

    // Catch Favicon requests
    app.get('/favicon.ico', (req, res) => {
      res.send(200);
    });
  }

  defineRoute() {
    const self = this;

    router.use((req, res, next) => {
      console.log(`/${req.method}`);
      next();
    });

    router.get('/', (req, res) => {
      res.sendFile('/public/index.html', {
        root: self.path
      });
    });

    app.use('/', router);

  }
}

module.exports = HttpServer;
