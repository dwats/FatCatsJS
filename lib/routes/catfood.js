const router = require('express').Router(); // eslint-disable-line new-cap

module.exports = (models) => {
  const CatfoodsMdl = models.Catfoods;

  router.get('/', (req, res) => {
    CatfoodsMdl
      .find()
      .sort({
        name: -1
      })
      .exec((err, catfoods) => {
        if (err) res.status(500).send(`Something went wrong!\n ${err}`);
        res.json(catfoods);
      });
  });

  return router;

};
