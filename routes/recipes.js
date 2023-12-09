const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, recipeController.index);
router.get('/new', ensureLoggedIn, recipeController.new);
router.post('/', ensureLoggedIn, recipeController.create);
router.get('/:id', ensureLoggedIn, recipeController.show);

module.exports = router;
