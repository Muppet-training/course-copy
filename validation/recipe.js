const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : '';
  data.time = !isEmpty(data.time) ? data.time : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Recipe name field is required';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'The price field is required';
  }

  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = 'ingredients are is required for a recipe...';
  }

  if (Validator.isEmpty(data.time)) {
    errors.time = 'How long did the recipe take you to make?';
  }

  if (!Validator.isNumeric(data.price)) {
    errors.price = 'Price must be a number';
  }

  if (!Validator.isNumeric(data.time)) {
    errors.time = 'Time needs to be a number and written in minutes';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
