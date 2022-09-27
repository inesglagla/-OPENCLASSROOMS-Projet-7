const Comment = require('../models/Comment');
const Post = require('../models/Post');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
    Comment.find()
    .then ((comments) => {res.status(200).json(comments)})
    .catch ((error) => {res.status(400).json({ message: error })});
};

//Ajouter un commentaire
exports.createComment = (req, res, next) => {
    Post.findOne({ postId: req.params.id })
    .then((result) => {
        if (result.id === req.params.postId) {
            const comment = new Comment({
                userId: req.auth.userId,
                postId: req.params.postId,
                content: req.body.content,

            });
            comment.save()
            Post.findOneAndUpdate(
                {postId: req.params.id},
                {$push: { comments: comment }}
            )
            .then(() => res.status(201).json({ message: 'Commentaire ajouté!'}))
            .catch((error) => res.status(400).json({ error }));
        } else {
            res.status(400).json({ message: "Cette publication n'existe pas." });
        }
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
        Post.findOne({ _id: req.params.id })
    .then((result) => {
        Comment.findOneAndUpdate(
            { _id: req.params.id },
            { 
                $inc: { userId: req.auth.userId,
                        postId: req.body.postId,
                        content: req.body.content, },
                $pull: { comments: req.body.userId },
            }
        )
        .then(() => res.status(200).json({ message: "Commentaire ajouté!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));

        const comment = new Comment({
        userId: req.auth.userId,
        postId: req.body.postId,
        content: req.body.content,
    });
    console.log(req.body.postId);
    comment.save()
    .then((comment) => res.status(201).json({ message: 'Commentaire ajouté!'}))
    .catch((error) => res.status(400).json({ error }));

        Post.findOne ({ postId: req.params.id})
    .then((result) => {
        console.log(result);
        Post.findOneAndUpdate(
            { _id: req.params.id },
            { $push: {
                    userId: req.auth.userId,
                    content: req.body.content, 
                }
            }
        )
        .then(() => res.status(201).json({ message: 'Commentaire ajouté!'}))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ message: "Cette publication n'existe pas." }));
*/

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
    .then(() => {
        Comment.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé!'}))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};