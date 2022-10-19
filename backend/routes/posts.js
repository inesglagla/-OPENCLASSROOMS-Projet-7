const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/admin')

router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, admin, multer, postCtrl.modifyPost);
router.delete('/:id', auth, admin, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.addLikePost);

module.exports = router;