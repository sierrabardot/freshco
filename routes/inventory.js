const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

module.exports = router;

router.get('/', inventoryController.index);
router.get('/new', inventoryController.new);
