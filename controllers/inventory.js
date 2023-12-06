const Inventory = require('../models/inventory');

module.exports = {
    index,
    new: newProduct,
};

async function index(req, res) {
    const inventory = await Inventory.find();
    res.render('inventory/index', { inventory, title: 'Inventory' });
}

function newProduct(req, res) {
    res.render('inventory/new', { title: 'Add Item' });
}
