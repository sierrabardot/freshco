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
// This function occurs when user navigates to /inventory and when a search is performed
async function index(req, res) {
    const userId = req.user.id;
    try {
        // page = current page; limit = number of items per page; search = keywords specified in search bar on inventory/index.ejs template
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const userInventory = await Inventory.find({
            owner: userId,
            productName: { $regex: search, $options: 'i' },
        })
            // Skips items from previous pages
            // i.e. if we are on page 2 and our limit is 10, we will skip ((2 - 1) * 10) items = 10 items will be skipped
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

// Renders page to create new item
function newProduct(req, res) {
    res.render('inventory/new', { title: 'Add Item' });
}

// Renders page to edit existing item - current item passed to template to prefill form
async function edit(req, res) {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/edit', {
        product,
        title: 'Update Inventory',
    });
}

// Updates from req.body are used to update product
async function update(req, res) {
    const updatedProduct = { ...req.body };
    const product = await Inventory.findById(req.params.id);
    try {
        await Inventory.updateOne({ id: req.params.id }, updatedProduct);
        res.redirect(`/inventory/${product.id}`);
    } catch (err) {
        console.log(err);
        res.render('inventory/edit', {
            product,
            title: 'Update Inventory',
        });
    }
}

// Renders inventory/show.ejs template and product details are provided
async function show(req, res) {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/show', {
        product,
        title: 'Inventory',
    });
}

// Details from inventory/new form are used to create new product (userId also provided)
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
