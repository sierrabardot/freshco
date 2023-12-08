const Recipe = require('../models/recipe');

module.exports = {
    index,
    // edit,
    show,
    // new: newRecipe,
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
    const ingredients = res.render('recipes/show', {
        recipe,
        title: recipe.name,
    });
}
