const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: {type: String, required: true},
  content: {type: String},
  imageUrl: {type: String},
  likes: {type: Number, default: 0},
  usersLiked: {type: [String]},
  comments: {type: [mongoose.Types.ObjectId], ref: 'Comment'},
});

module.exports = mongoose.model('Post', postSchema);