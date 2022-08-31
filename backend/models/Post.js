const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  post: {type: String},
  imageUrl: {type: String},
  likes: {type: Number, default: 0},
  usersLiked: {type: [String]},
});

module.exports = mongoose.model('Post', postSchema);