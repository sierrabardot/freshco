const Production = require('../models/production');
const Inventory = require('../models/inventory');
const Recipe = require('../models/recipe');

module.exports = {
    index,
    // edit,
    // new: newProduction,
    // create,
    // update,
};

async function index(req, res) {
    const userId = req.user.id;
    try {
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
            title: 'Production History',
            pagination: response,
        });
    } catch (err) {
        console.log(err);
        res.render('/', { title: 'Home' });
    }
}

// function edit(req, res) {}

// function newProduction(req, res) {}

// function create(req, res) {}

// function update(req, res) {}
