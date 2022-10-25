const Comment = require('../models/Comment');
const Post = require('../models/Post');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
    .then((result) => {
        if (result.id === req.params.postId) {
            Comment.find({ postId: result.id })
            .then ((comments) => {res.status(200).json(comments)})
            .catch ((error) => {res.status(400).json({ message: error })});
        }
    })
    .catch((error) => res.status(500).json({ error }));
};

//Ajouter un commentaire
exports.createComment = (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
    .then((result) => {
            if (result.id === req.params.postId) {
                const comment = new Comment({
                    userId: req.auth.userId,
                    postId: req.params.postId,
                    content: req.body.content,
                    dateComment: new Date().toLocaleString(),
                });
                comment.save()
                Post.findOneAndUpdate(
                    { _id: req.params.postId },
                    { $push: { comments: comment } }
                )
                .then(() => res.status(201).json({ message: 'Commentaire ajouté!'}))
                .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(400).json({ message: "Cette publication n'existe pas." });
            }
        })
    .catch((error) => res.status(500).json({ error }));
};