const Post = require('../models/Post');
const fs = require('fs');
const isAdmin = undefined;

//Afficher tous les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
    .then ((posts) => {res.status(200).json(posts);})
    .catch ((error) => {res.status(400).json({ message: error });});
};

//Créer un post
exports.createPost = (req, res, next) => {
    const post = new Post({
    _id: req.params.id,
    userId: req.body.userId,
    post: req.body.post,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    });
    if (req.body.post == false || req.body.imageUrl == false) {
      console.log("Il faut écrire un post ou envoyer une image!");
    } else {
    post.save()
    .then((post) => res.status(201).json({ message: 'Le post a été ajouté!'}))
    .catch(error => res.status(400).json({ error }));
  }
};

//Modifier un post
exports.modifyPost = (req, res, next) => {
    const postData = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: req.body.imageUrl,
        } : { ...req.body };
        delete postData._userId;
      Post.findOne({_id: req.params.id})
          .then((post) => {
            //Vérification de l'utilisateur, ou si c'est un admin
            if (user.isAdmin == false || post.userId != req.auth.userId) {
                res.status(403).json({ message : 'Seul le propriétaire peut modifier son post.'});
            } else {
            //On vérifie si on ne modifie pas l'image
            if (req.file == undefined) {
              Post.updateOne(
                { _id: req.params.id}, 
                { ...postData, _id: req.params.id}
                )
              .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
              .catch(error => res.status(401).json({ error }));
            }
            //Si on modifie l'image
            fs.unlink(`images/${filename}`, () => {
              Post.updateOne(
                { _id: req.params.id}, 
                { ...postData, _id: req.params.id}
                )
              .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
              .catch(error => res.status(401).json({ error }));
            })
          }})
        .catch((error) => {res.status(403).json({ error });}
    );
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (user.isAdmin == false || post.userId != req.auth.userId) {
                res.status(403).json({ message : 'Seul le propriétaire peut supprimer son post.'});
            } else {
            Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Le post a été supprimé!'}))
            .catch(error => res.status(400).json({ error }));
        }})
        .catch(error => res.status(500).json({ error }));
};

//Liker un post
exports.addLikePost = (req, res, next) => {
  //On vérifie si un avis a déjà été donné par l'utilisateur
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (req.body.like > 1) {
      res.status(400).json({ message: "Vous avez déjà liké ce post."});
    } else {
    //Aimer le post
    if (req.body.like == 1) {
        Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
        .then(() => res.status(200).json({ message: 'La post a été liké!' }))
        .catch((error) => res.status(400).json({ error }));
    //Retirer le like
    } else {
      Post.findOne({ _id: req.params.id })
      .then((result) => {
        if (result.usersLiked.includes(req.body.userId)) {
            Post.findOneAndUpdate(
              { _id: req.params.id },
              { 
                $inc: { likes: -1 }, 
                $pull: { usersLiked: req.body.userId },
              }
              )
              .then(() => res.status(200).json({ message: "Le like a été retiré!" }))
              .catch((error) => res.status(400).json({ error }));
            }
        })
    }}
  })
};