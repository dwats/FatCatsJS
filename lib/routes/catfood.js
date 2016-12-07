const router = require('express').Router();
const mongoose = require('mongoose');
const models = require('../models')(mongoose);

const CatfoodsMdl = models.Catfoods;

router.get('/', (req, res) => {
  CatfoodsMdl
    .find()
    .sort({
      name: -1
    })
    .exec((err, catfoods) => {
      if (err) res.status(500).send(`Something went wrong\n ${err}`);
      res.json(catfoods);
    });
});

module.exports = router;
