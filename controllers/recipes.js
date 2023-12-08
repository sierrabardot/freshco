const Recipe = require('../models/recipe');

module.exports = {
    index,
    // edit,
    // show,
    // new: newRecipe,
    // create,
    // update,
    // delete: deleteRecipe,
};

async function index(req, res) {
    const recipes = await Recipe.find();
    res.render('recipes/index', {
        recipes,
        title: 'Recipes',
    });
}
