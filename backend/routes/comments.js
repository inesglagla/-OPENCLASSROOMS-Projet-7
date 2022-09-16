const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.get('/', auth, commentCtrl.getAllComment);
router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;