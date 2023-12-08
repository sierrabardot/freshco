const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

module.exports = router;

router.get('/', indexController.index);
router.get('/auth/google', indexController.googleOAuth);
router.get('/oauth2callback', indexController.googleOAuthCallback);
router.get('/logout', indexController.logout);
