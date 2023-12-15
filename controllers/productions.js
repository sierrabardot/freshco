const Production = require('../models/production');
const Inventory = require('../models/inventory');
const Recipe = require('../models/recipe');

module.exports = {
    index,
    // edit,
    new: newProduction,
    create,
    // update,
};

async function index(req, res) {
    const userId = req.user.id;
    // userRecipes passed into template to render recipes when requesting to add new production
    const userRecipes = await Recipe.find({ owner: userId }).sort({
        name: 'asc',
    });
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        // Sort in decending order of date
        const userProductions = await Production.find({ owner: userId })
            .populate('stockUsed.ingredientName')
            .sort({ date: 'desc' })
            .skip((page - 1) * limit)
            .limit(limit);

        const response = {
            page,
            limit,
        };

        res.render('productions/index', {
            userProductions,
            userRecipes,
            title: 'Production History',
            pagination: response,
        });
    } catch (err) {
        console.log(err);
        res.render('/', { title: 'Home' });
    }
}

// function edit(req, res) {}

async function newProduction(req, res) {
    // Form is prefilled with example batch number - today's date
    const date = new Date()
        .toISOString()
        .split('', 10)
        .join('')
        .replace('-', '')
        .replace('-', '');
    // Recipe data is passed to template so that user does not need to individually select ingts
    const recipe = await Recipe.find({ name: req.query.recipe }).populate(
        'ingredients.product'
    );
    const userInventory = await Inventory.find({ owner: req.user.id }).sort({
        productName: 'asc',
    });
    res.render('productions/new', {
        date,
        recipe,
        userInventory,
        title: 'Log Production',
    });
}

async function create(req, res) {
    const userId = req.user.id;
    const ingredients = req.body.ingredients;
    // Loops through all ingredients on form and finds each in the user's Inventory
    let ingredientsArr = [];
    for (let i = 0; i < ingredients.length; i++) {
        const product = await Inventory.findOne({
            owner: userId,
            productName: ingredients[i],
        });
        // Ingt object stores product ID from Inventory, and batch/quantityUsed as specified on the form
        const ingredientObj = {
            ingredientName: product._id,
            ingredientBatch: req.body.ingredientBatch[i],
            quantityUsed: req.body.quantityUsed[i],
        };
        // ingredientObj is pushed to ingredientsArr, which is used in newProduction object
        ingredientsArr.push(ingredientObj);
    }
    const newProduction = {
        owner: userId,
        name: req.body.name,
        date: req.body.date,
        batch: req.body.batch,
        quantityMade: req.body.quantityMade,
        stockUsed: ingredientsArr,
    };
    console.log(newProduction);
    try {
        // newProduction object is used to create a new recipe
        await Production.create(newProduction);
        res.redirect('/productions');
    } catch (err) {
        console.log(err);
        const userRecipes = await Recipe.find({ owner: userId }).sort({
            name: 'asc',
        });
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        // Sort in decending order of date
        const userProductions = await Production.find({ owner: userId })
            .sort({ date: 'desc' })
            .skip((page - 1) * limit)
            .limit(limit);

        const response = {
            page,
            limit,
        };

        res.render('productions/index', {
            userProductions,
            userRecipes,
            title: 'Production History',
            pagination: response,
        });
    }
}

// function update(req, res) {}
