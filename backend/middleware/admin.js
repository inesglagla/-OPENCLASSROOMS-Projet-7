//Ce middleware permet de déterminer si la publication appartient à l'utilisateur et si l'utilisateur est un administrateur
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
    .then((user) => {
      const isAdmin = user.isAdmin;
      Post.findOne({ _id: req.params.id })
        .then((post) => {
        if (post.userId != req.auth.userId) {
            if (isAdmin === false) {
                res.status(403).json({ message : 'Seul le propriétaire peut intéragir.'});
            } else {
                next();
            }
        } else {
            next();
        }
        })
    })
};