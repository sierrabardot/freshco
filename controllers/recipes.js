const Recipe = require('../models/recipe');
const Inventory = require('../models/inventory');

module.exports = {
    index,
    // edit,
    show,
    new: newRecipe,
    create,
    // update,
    // delete: deleteRecipe,
};

async function index(req, res) {
    const userRecipes = await Recipe.find({ owner: req.user.id });
    res.render('recipes/index', {
        userRecipes,
        title: 'Recipes',
    });
}

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
    const userInventory = await Inventory.find({ owner: req.user.id });
    const ingredients = req.body.ingredients;
    let ingredientsArr = [];
    for (let i = 0; i < ingredients.length; i++) {
        const product = await Inventory.findOne({
            productName: ingredients[i],
        });
        console.log(`product: ${product}`);
        const ingredientObj = {
            product: product._id,
            quantityRequired: req.body.quantityRequired[i],
        };
        ingredientsArr.push(ingredientObj);
    }

    const newRecipe = {
        owner: userId,
        name: req.body.name,
        ingredients: ingredientsArr,
        serves: +req.body.serves,
        method: req.body.method,
    };
    try {
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
    const userId = req.user.id;
    const userInventory = await Inventory.find({ owner: userId });
    res.render('recipes/new', {
        userInventory,
        title: 'Add Recipe',
    });
}
