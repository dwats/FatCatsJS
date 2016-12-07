const router = require('express').Router(); // eslint-disable-line new-cap

module.exports = (models) => {
  const LitterMdl = models.Litters;

  router.get('/', (req, res) => {
    LitterMdl
      .find()
      .sort({
        datetime: -1
      })
      .exec((err, litters) => {
        if (err) res.status(500).send(`Something went wrong!\n${err}`);
        res.json(litters);
      });
  });

  return router;
};
