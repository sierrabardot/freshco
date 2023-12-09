const Recipe = require('../models/recipe');
const Inventory = require('../models/inventory');

module.exports = {
    index,
    // edit,
    show,
    new: newRecipe,
    // create,
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

async function newRecipe(req, res) {
    const userId = req.user.id;
    const userInventory = await Inventory.find({ owner: userId });
    res.render('recipes/new', {
        userInventory,
        title: 'Add Recipe',
    });
}
