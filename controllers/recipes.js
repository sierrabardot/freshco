const Recipe = require('../models/recipe');
const Inventory = require('../models/inventory');

module.exports = {
    index,
    edit,
    show,
    new: newRecipe,
    create,
    update,
    delete: deleteRecipe,
};

// Returns recipes for the logged in user (req.user.id) sorted in alphabetical order
async function index(req, res) {
    const userId = req.user.id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const userRecipes = await Recipe.find({
            owner: userId,
            name: { $regex: search, $options: 'i' },
        })
            .sort({ name: 'asc' })
            // Skips items from previous pages
            // i.e. if we are on page 2 and our limit is 10, we will skip ((2 - 1) * 10) items = 10 items will be skipped
            .skip((page - 1) * limit)
            .limit(limit);

        const response = {
            page,
            limit,
        };
        res.render('recipes/index', {
            userRecipes,
            title: 'Recipes',
            pagination: response,
        });
    } catch (err) {
        console.log(err);
        res.render('/', { title: 'Home' });
    }
}

// Populates ingredients for each recipe
// -> First argument = what we are populating in the Recipe model
// -> Second argument = populates the ingt name and sku from the Inventory model
async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id).populate(
        'ingredients.product',
        'productName sku'
    );
    res.render('recipes/show', {
        recipe,
        title: recipe.name,
    });
}

async function create(req, res) {
    const userId = req.user.id;
    const userInventory = await Inventory.find({ owner: userId });
    const ingredients = req.body.ingredients;
    // Loops through all ingredients specified on form and finds each in the user's Inventory
    let ingredientsArr = [];
    for (let i = 0; i < ingredients.length; i++) {
        const product = await Inventory.findOne({
            owner: userId,
            productName: ingredients[i],
        });
        // Ingt object stores product ID from Inventory, and quantityRequired as specified on the form
        const ingredientObj = {
            product: product._id,
            quantityRequired: req.body.quantityRequired[i],
        };
        // ingredientObj is pushed to ingredientsArr, which is used in newRecipe object
        ingredientsArr.push(ingredientObj);
    }
    // req.body.method returns an array, so method does not need to be looped over
    const newRecipe = {
        owner: userId,
        name: req.body.name,
        ingredients: ingredientsArr,
        serves: +req.body.serves,
        method: req.body.method,
    };
    try {
        // newRecipe object is used to create a new recipe
        await Recipe.create(newRecipe);
        res.redirect('/recipes');
    } catch (err) {
        console.log(err);
        res.render('recipes/new', {
            userInventory,
            title: 'Add Recipe',
        });
    }
}

async function newRecipe(req, res) {
    // User Inventory is sorted in alphabetical order and passed to template in order to render user's inventory in select element
    const userInventory = await Inventory.find({ owner: req.user.id }).sort({
        productName: 'asc',
    });
    res.render('recipes/new', {
        userInventory,
        title: 'Add Recipe',
    });
}

async function edit(req, res) {
    // Ingredients populated from user's inventory, so form is prefilled with ingredient names
    const recipe = await Recipe.findById(req.params.id).populate(
        'ingredients.product'
    );
    console.log(recipe);
    const userInventory = await Inventory.find({ owner: req.user.id });
    res.render('recipes/edit', {
        userInventory,
        recipe,
        title: 'Update Recipe',
    });
}

// Works similarly to create function - ingredients are looped through and pushed to ingtsArr, which is used to update recipe
async function update(req, res) {
    const userId = req.user.id;
    const recipe = await Recipe.findById(req.params.id);
    const ingredients = req.body.ingredients;
    let ingredientsArr = [];
    for (let i = 0; i < ingredients.length; i++) {
        const product = await Inventory.findOne({
            owner: userId,
            productName: ingredients[i],
        });
        const ingredientObj = {
            product: product._id,
            quantityRequired: req.body.quantityRequired[i],
        };
        ingredientsArr.push(ingredientObj);
    }
    const updatedRecipe = {
        owner: userId,
        name: req.body.name,
        ingredients: ingredientsArr,
        serves: +req.body.serves,
        method: req.body.method,
    };
    try {
        await Recipe.updateOne({ id: userId }, updatedRecipe);
        res.redirect(`/recipes/${recipe.id}`);
    } catch (err) {
        console.log(err);
        const userInventory = await Inventory.find({ owner: userId });
        res.render('recipes/edit', {
            recipe,
            userInventory,
            title: 'Update Recipe',
        });
    }
}

async function deleteRecipe(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    try {
        await Recipe.findByIdAndDelete(recipe.id);
        res.redirect('/recipes');
    } catch (err) {
        console.log(err);
        res.render('recipe/edit', {
            recipe,
            title: 'Update Recipe',
        });
    }
}
