const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: {type: String, required: true},
  postId: {type : String, required: true},
  content: {type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);