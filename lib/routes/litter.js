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
        if (err) {
          res.status(500);
          res.send(`Something went wrong!\n${err}`);
        }
        else res.json(litters);
      });
  });

  router.post('/', (req, res) => {
    const newLitter = new LitterMdl({
      datetime: req.body.datetime
    });
    newLitter.save((err) => {
      if (err) {
        res.status(500);
        res.send(`Something went wrong!\n ${err}`);
      }
      else console.log('POST Success!');
    });
    return res.send(newLitter);
  });

  router.put('/:id', (req, res) =>
    LitterMdl
      .findById(req.params.id, (err, thisLitter) => {
        thisLitter = {
          datetime: req.body.datetime
        };
        return thisLitter.save((saveErr) => {
          if (err) {
            res.status(500);
            res.send(`Something went wrong!\n ${saveErr}`);
          }
          else console.log('PUT Success!');
          return res.send(thisLitter);
        });
      })
  );

  router.delete('/:id', (req, res) =>
    LitterMdl
      .findById(req.params.id, (err, thisLitter) =>
        thisLitter.remove((removeErr) => {
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
