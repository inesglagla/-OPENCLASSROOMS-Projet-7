const Post = require('../models/Post');
const fs = require('fs');

//Afficher tous les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
    .then ((posts) => res.status(200).json(posts))
    .catch ((error) => res.status(400).json({ error }));
};

//Afficher un post
exports.getOnePost = (req, res, next) => {
  Post.findOne ({
    _id: req.params.id
  })
  .then((sauce) => res.status(200).json(sauce))
  .catch((error) => res.status(400).json({ error }));
};

//Créer un post
exports.createPost = (req, res, next) => {
    const post = new Post({
      userId: req.auth.userId,
      post: req.body.post,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
    });
    post.save()
    .then((post) => res.status(201).json({ message: 'Le post a été ajouté!'}))
    .catch(error => res.status(400).json({ error }));
};

//Modifier un post
exports.modifyPost = (req, res, next) => {
    const postData = req.file ? {
      userId: req.auth.userId,
      post: req.body.post,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,} : { ...req.body };
      delete postData._userId;
      Post.findOne({_id: req.params.id})
        .then((post) => {
          if (post.userId != req.auth.userId) {
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
          } else {
          //Si on modifie l'image
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.updateOne(
              { _id: req.params.id}, 
              { ...postData, _id: req.params.id}
              )
            .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
            .catch(error => res.status(401).json({ error }));
          })
        }}
      })
      .catch((error) => {res.status(403).json({ error })});
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
          if (post.userId != req.auth.userId) {
            res.status(403).json({ message : 'Seul le propriétaire peut supprimer son post.'});
          } else {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Le post a été supprimé!'}))
              .catch((error) => res.status(400).json({ error }));
            })}
        })
        .catch((error) => res.status(500).json({ error }));
};

//Validité des likes
likesValidity = (likes) => {
  return /[0-9]/.test(likes);
}

//Liker un post
exports.addLikePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then((result) => {
    //On vérifie si un avis a déjà été donné par l'utilisateur
    if (req.body.likes > 1) {
      return res.status(400).json({ message: "Vous ne pouvez liké le post qu'une seule fois."});
    } else {
    //Aimer le post
    if (likesValidity(req.body.likes)) {
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
      //Retirer le like
      } else {
        Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
        .then(() => res.status(200).json({ message: 'Le post a été liké!' }))
        .catch((error) => res.status(400).json({ error }));
      }
    } else {
      return res.status(400).json({ message: "Les lettres ne sont pas acceptées pour un nombre."});
    }
}
  })
  .catch((error) => res.status(500).json({error}));
};