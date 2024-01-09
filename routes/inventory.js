const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
const ensureLoggedIn = require('../config/ensureLoggedIn');

module.exports = router;

router.get('/new', ensureLoggedIn, inventoryController.new);
router.get('/:id', ensureLoggedIn, inventoryController.show);
router.get('/', ensureLoggedIn, inventoryController.index);
router.post('/', ensureLoggedIn, inventoryController.create);
router.get('/:id/edit', ensureLoggedIn, inventoryController.edit);
router.put('/:id', ensureLoggedIn, inventoryController.update);
router.delete('/:id', ensureLoggedIn, inventoryController.delete);
router.get('/:id/receive', ensureLoggedIn, inventoryController.receiveStock);
router.put('/:id', ensureLoggedIn, inventoryController.receiveStock);
