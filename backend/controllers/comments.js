const Comment = require('../models/Comment');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
    Comment.find()
    .then ((comments) => {res.status(200).json(comments)})
    .catch ((error) => {res.status(400).json({ message: error })});
};

//Ajouter un commentaire
exports.createComment = (req, res, next) => {
    const comment = new Comment({
        userId: req.auth.userId,
        comment: req.body.comment,
    });
    console.log(req.body.comment);
    comment.save()
    .then(() => res.status(201).json({ message: 'Commentaire ajouté!'}))
    .catch((error) => res.status(400).json({ error }));
};

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