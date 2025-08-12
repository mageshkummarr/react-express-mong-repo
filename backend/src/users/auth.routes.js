 
const express = require('express');
const router = express.Router();
const controller = require('../users/auth.controller');
const { validateLogin } = require('../users/auth.validator');

router.post('/login', validateLogin, controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refreshToken); 

module.exports = router;
