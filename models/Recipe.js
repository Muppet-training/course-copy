const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
