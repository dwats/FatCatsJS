const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile('/public/index.html', {
    root: this.path
  });
});
router.use('/feedings', require('./feeding'));

module.exports = router;
