const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require ('../middleware/password');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers)
router.get('/users/:id', userCtrl.getOneUser)
router.put('/users/:id', auth, multer, userCtrl.putProfilePicture)

module.exports = router;