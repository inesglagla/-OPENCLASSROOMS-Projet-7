const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.get('/:postId/comments', auth, commentCtrl.getAllComment);
router.post('/:postId/comments', auth, commentCtrl.createComment);
router.delete('/:postId/comments/:id', auth, commentCtrl.deleteComment);

module.exports = router;