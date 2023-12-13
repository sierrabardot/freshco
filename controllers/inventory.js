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

// Used this video on pagination and search APIs: https://www.youtube.com/watch?v=0T4GsMYnVN4
async function index(req, res) {
    const userId = req.user.id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';
        const userInventory = await Inventory.find({
            owner: userId,
            productName: { $regex: search, $options: 'i' },
        })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Inventory.countDocuments({
            owner: userId,
            productName: { $regex: search, $options: 'i' },
        });

        const response = {
            error: false,
            total,
            page,
            limit,
            userInventory,
        };

        res.render('inventory/index', {
            userInventory,
            title: 'Inventory',
            pagination: response,
        });
    } catch (err) {
        console.log(err);
        res.render('/', { title: 'Home' });
    }
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
    const userId = req.user.id;
    const newProduct = { ...req.body, owner: userId };
    try {
        await Inventory.create(newProduct);
        res.redirect('/inventory');
    } catch (err) {
        console.log(err);
        res.render('inventory/new', {
            title: 'Add Item',
        });
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
