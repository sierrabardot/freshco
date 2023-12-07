const Inventory = require('../models/inventory');

module.exports = {
    index,
    edit,
    show,
    new: newProduct,
    create,
    update,
    delete: deleteProduct,
};

async function index(req, res) {
    const inventory = await Inventory.find();
    res.render('inventory/index', {
        inventory,
        title: 'Inventory',
    });
}

function newProduct(req, res) {
    res.render('inventory/new', { title: 'Add Item' });
}

async function edit(req, res) {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/edit', {
        product,
        title: 'Update Inventory',
    });
}

async function update(req, res) {
    const updatedProduct = { ...req.body };
    const product = await Inventory.findById(req.params.id);
    try {
        await Inventory.updateOne({ _id: req.params.id }, updatedProduct);
        res.redirect(`/inventory/${product._id}`);
    } catch (err) {
        console.log(err);
        res.render('inventory/edit', {
            product,
            title: 'Update Inventory',
        });
    }
}

async function show(req, res) {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/show', {
        product,
        title: 'Inventory',
    });
}

async function create(req, res) {
    const newProduct = { ...req.body };
    try {
        await Inventory.create(newProduct);
        res.redirect('/inventory');
    } catch (err) {
        console.log(err);
        res.render('inventory/new');
    }
}

async function deleteProduct(req, res) {
    const product = await Inventory.findById(req.params.id);
    try {
        await Inventory.findByIdAndDelete(product.id);
        res.redirect('/inventory');
    } catch (err) {
        console.log(err);
        res.render('inventory/edit', {
            product,
            title: 'Update Inventory',
        });
    }
}
