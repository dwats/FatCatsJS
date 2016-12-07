const router = require('express').Router();

router.use('/feedings', require('./feeding'));
router.use('/catfoods', require('./catfood'));
router.use('/litters', require('./litter'));
router.use('/waterings', require('./watering'));

module.exports = router;
