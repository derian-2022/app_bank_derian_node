const express = require('express');

//Controllers
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.get('/:id/history', usersController.findById);

module.exports = router;