const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Recipe model
const Recipe = require('../../models/Recipe');

// Validation
const validateRecipeInput = require('../../validation/recipe');

// @route   GET api/recipes/test
// @desc    Test recipe route
// @access  public
router.get('/test', (req, res) => res.json({ msg: 'Recipe Works' }));

// @route   POST api/recipes
// @desc    Add a recipe
// @access  private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any error, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
      time: req.body.time,
      user: req.user.id
    });

    newRecipe.save().then(recipe => res.json(recipe));
  }
);

module.exports = router;
