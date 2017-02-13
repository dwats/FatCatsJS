const router = require('express').Router(); // eslint-disable-line new-cap

module.exports = (models) => {
  const FeedingMdl = models.Feedings;

  router.get('/', (req, res) => {
    FeedingMdl
      .find()
      .sort({
        datetime: -1
      })
      .exec((err, feedings) => {
        if (err) {
          res.status(500);
          res.send(`Something went wrong!\n ${err}`);
        }
        else res.json(feedings);
      });
  });

  router.put('/:id', (req, res) =>
    FeedingMdl
      .findById(req.params.id, (err, thisFeeding) => {
        thisFeeding = {
          food: req.body.food,
          amount: req.body.amount
        };
        return thisFeeding.save((saveErr) => {
          if (err) {
            res.status(500);
            res.send(`Something went wrong!\n ${saveErr}`);
          }
          else console.log('PUT Success!');
          return res.send(thisFeeding);
        });
      })
  );

  router.post('/', (req, res) => {
    const newFeeding = new FeedingMdl({
      datetime: req.body.datetime,
      food: req.body.food,
      amount: req.body.amount
    });
    newFeeding.save((err) => {
      if (err) {
        res.status(500);
        res.send(`Something went wrong!\n ${err}`);
      }
      else console.log('POST Success!');
    });
    return res.send(newFeeding);
  });

  router.delete('/:id', (req, res) =>
    FeedingMdl
      .findById(req.params.id, (err, thisFeeding) =>
        thisFeeding.remove((removeErr) => {
          if (err) {
            res.status(500);
            res.send(`Something went wrong!\n ${removeErr}`);
          }
          else console.log('DELETE Success!');
          return res.send('');
        })
    )
  );

  return router;
};
