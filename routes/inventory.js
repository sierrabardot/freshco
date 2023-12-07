const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

module.exports = router;

router.get('/new', inventoryController.new);
router.get('/:id', inventoryController.show);
router.get('/', inventoryController.index);
router.post('/', inventoryController.create);
router.get('/:id/edit', inventoryController.edit);
router.put('/:id', inventoryController.update);
router.delete('/:id', inventoryController.delete);
