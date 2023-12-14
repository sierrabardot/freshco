const express = require('express');
const router = express.Router();
const productionsController = require('../controllers/productions');
const ensureLoggedIn = require('../config/ensureLoggedIn');

module.exports = router;

router.get('/new', ensureLoggedIn, productionsController.new);
router.get('/', ensureLoggedIn, productionsController.index);
// router.post('/', ensureLoggedIn, productionsController.create);
// router.get('/:id/edit', ensureLoggedIn, productionsController.edit);
// router.put('/:id', ensureLoggedIn, productionsController.update);
