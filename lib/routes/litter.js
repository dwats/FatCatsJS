const router = require('express').Router(); // eslint-disable-line new-cap

module.exports = (models) => {
  const LitterMdl = models.Litters;

  router.get('/', (req, res, next) => {
    LitterMdl
      .find()
      .sort({
        datetime: -1
      })
      .exec((err, litters) => {
        if (err) return next(err);
        res.json(litters);
      });
  });

  router.post('/', (req, res, next) => {
    LitterMdl.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  });

// TODO pickup here and finish updating routes to new spec, see above.
  router.put('/:id', (req, res) =>
    LitterMdl
      .findById(req.params.id, (err, thisLitter) => {
        thisLitter = {
          datetime: req.body.datetime
        };
        return thisLitter.save((saveErr) => {
          if (err) {
            res.status(500).send({ error: `Something went wrong!\n ${saveErr}` });
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
            res.status(500).send({ error: `Something went wrong!\n ${removeErr}` });
          }
          else console.log('DELETE Success!');
          return res.send('');
        })
    )
  );

  return router;
};
