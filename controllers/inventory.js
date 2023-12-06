const Inventory = require('../models/inventory');

module.exports = {
    index,
    new: newProduct,
    create,
};

async function index(req, res) {
    const inventory = await Inventory.find();
    res.render('inventory/index', { inventory, title: 'Inventory' });
}

function newProduct(req, res) {
    res.render('inventory/new', { title: 'Add Item' });
}

async function create(req, res) {
    const newProduct = { ...req.body };
    try {
        await Inventory.create(newProduct);
        res.redirect('/inventory');
    } catch (err) {
        res.render('inventory/new', { errorMsg: err.message });
    }
}
