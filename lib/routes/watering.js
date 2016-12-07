const router = require('express').Router(); // eslint-disable-line new-cap

module.exports = (models) => {
  const WateringMdl = models.Waterings;

  router.get('/', (req, res) => {
    WateringMdl
      .find()
      .sort({
        datetime: -1
      })
      .exec((err, waterings) => {
        if (err) res.status(500).send(`Something went wrong!\n${err}`);
        res.json(waterings);
      });
  });

  return router;
};
