const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

router.get('/', recipeController.index);

module.exports = router;
