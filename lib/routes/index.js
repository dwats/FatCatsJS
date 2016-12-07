const catfood = require('./catfood');
const feeding = require('./feeding');
const litter = require('./litter');
const model = require('../models');
const watering = require('./watering');

module.exports = (express, mongoose) => {
  const models = model(mongoose);
  const router = express.Router();

  router.use('/catfoods', catfood(models));
  router.use('/feedings', feeding(models));
  router.use('/litters', litter(models));
  router.use('/waterings', watering(models));

  return router;
};
