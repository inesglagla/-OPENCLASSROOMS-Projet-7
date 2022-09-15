const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require ('../middleware/password');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers)
router.get('/users/:id', userCtrl.getOneUser)

module.exports = router;