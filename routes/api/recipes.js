const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Recipe model
const Recipe = require('../../models/Recipe');

// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateRecipeInput = require('../../validation/recipe');

// @route   GET api/recipes/test
// @desc    Test recipe route
// @access  public
router.get('/test', (req, res) =>
	res.json({
		msg: 'Recipe Works'
	})
);

// @route   GET api/recipes
// @desc    Get recipes
// @access  public
router.get('/', (req, res) => {
	Recipe.find()
		.sort({
			name: +1
		})
		.then((recipes) =>
			res.json(recipes).catch((err) =>
				res.status(404).json({
					nopostdsffound: 'No posts found..'
				})
			)
		);
});

// @route   GET api/recipes/id
// @desc    Get recipe by id
// @access  public
router.get('/:id', (req, res) => {
	Recipe.findById(req.params.id)
		.then((recipe) => res.json(recipe))
		.catch((err) =>
			res.status(404).json({
				nopostfound: 'No post found with that ID..'
			})
		);
});

// @route   POST api/recipes
// @desc    Add a recipe
// @access  private
router.post(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
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

		newRecipe.save().then((recipe) => res.json(recipe));
	}
);

// @route   DELETE api/recipes/:id
// @desc    Delete a recipe
// @access  private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Recipe.findById(req.params.id)
				.then((recipe) => {
					// Check for recipe owner
					if (recipe.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notauthorized: ' User not authorized ' });
					}
					// Delete Recipe
					recipe.remove().then(() => res.json({ success: true }));
				})
				.catch((err) =>
					res
						.status(404)
						.json({ recipenotfound: 'No recipe to delete' })
				);
		});
	}
);

module.exports = router;
