// TODO Refactor all of this
module.exports = function (mongoose) {
  const Schema = mongoose.Schema;
  const Feeding = new Schema({
    datetime: {
      type: Date,
      required: true
    },
    food: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    }
  });

  const Catfood = new Schema({
    brand: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    consistency: {
      type: String,
      required: true
    },
    kcal: {
      type: Number,
      required: true
    },
    measurement: {
      type: String,
      required: true
    }
  });

  const Litter = new Schema({
    datetime: {
      type: Date,
      required: true
    }
  });

  const Watering = new Schema({
    datetime: {
      type: Date,
      required: true
    }
  });

  const models = {
    Feedings: mongoose.model('Feedings', Feeding),
    Catfoods: mongoose.model('Catfoods', Catfood),
    Litters: mongoose.model('Litters', Litter),
    Waterings: mongoose.model('Waterings', Watering)
  };

  return models;
};
