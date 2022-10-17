const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
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
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(400).json({ error }));
};

//Créer un post
exports.createPost = (req, res, next) => {
    //On vérifie si on envoie une image, si ce n'est pas le cas :
    if (req.file === undefined) {
      const post = new Post({
        userId: req.auth.userId,
        content: req.body.content,
        imageUrl: '',
        likes: 0,
        date: new Date().toLocaleString(),
      });
      if (req.body.content) {
        post.save()
        .then((post) => res.status(201).json({ message: 'Le post a été ajouté!'}))
        .catch(error => res.status(400).json({ error }));
      } else {
        res.status(403).json({ message : 'Il faut envoyer une image ou un texte.'});
      }
    //Si on envoie une image :
    } else {
      const post = new Post({
        userId: req.auth.userId,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        date: new Date().toLocaleString(),
      });
      post.save()
      .then((post) => res.status(201).json({ message: 'Le post a été ajouté!'}))
      .catch(error => res.status(400).json({ error }));
    }
};

//Modifier un post
exports.modifyPost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
    const isAdmin = user.isAdmin;
    const postData = req.file ? {
      content: req.body.content,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      } : { ...req.body };
      Post.findOne({_id: req.params.id})
        .then((post) => {
          if (post.userId != req.auth.userId) {
            if (isAdmin === false) {
              res.status(403).json({ message : 'Seul le propriétaire peut modifier son post.'});
            } else {
              if (req.body.content === undefined && req.file === undefined) {
                res.status(401).json({ message : 'Vous ne pouvez pas envoyer des informations vides.'});
              } else {
                //On vérifie si on ne modifie pas l'image
                if (req.file === undefined) {
                  Post.updateOne(
                    { _id: req.params.id}, 
                    { ...postData, _id: req.params.id}
                    )
                  .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
                  .catch(error => res.status(401).json({ error }));
                } else {
                //Si on modifie l'image
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/posts/${filename}`, () => {
                  Post.updateOne(
                    { _id: req.params.id}, 
                    { ...postData, _id: req.params.id}
                    )
                  .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
                  .catch((error) => res.status(401).json({ error }));
                })
              }}
            }
          } else {
            if (req.body.content === undefined && req.file === undefined) {
              res.status(401).json({ message : 'Vous ne pouvez pas envoyer des informations vides.'});
            } else {
              //On vérifie si on ne modifie pas l'image
              if (req.file === undefined) {
                Post.updateOne(
                  { _id: req.params.id}, 
                  { ...postData, _id: req.params.id}
                  )
                .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
                .catch(error => res.status(401).json({ error }));
              } else {
              //Si on modifie l'image
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/posts/${filename}`, () => {
                Post.updateOne(
                  { _id: req.params.id}, 
                  { ...postData, _id: req.params.id}
                  )
                .then(() => res.status(200).json({message : 'Le post a été modifié!'}))
                .catch((error) => res.status(401).json({ error }));
              })
            }
          }}
      })
      .catch((error) => res.status(403).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      const isAdmin = user.isAdmin;
      Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.userId != req.auth.userId) {
          if (isAdmin === false) {
              res.status(403).json({ message : 'Seul le propriétaire peut supprimer son post.'});
          } else {
            if (req.file == undefined) {
              Post.deleteOne({ _id: req.params.id })
              .then(() => {
                Comment.deleteMany({ postId: req.params.id })
                .then(() => {
                  res.status(200).json({ message: 'Le post a été supprimé!'})
                })
                .catch((error) => res.status(400).json({ error }));
              })
              .catch((error) => res.status(400).json({ error }));
            } else {
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/posts/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                .then(() => {
                  Comment.deleteMany({ postId: req.params.id })
                  .then(() => {
                    res.status(200).json({ message: 'Le post a été supprimé!'})
                  })
                  .catch((error) => res.status(400).json({ error }));
                })
                .catch((error) => res.status(400).json({ error }));
              })
            }
          }
        } else {
          if (post.imageUrl === undefined) {
            Post.deleteOne({ _id: req.params.id })
              .then(() => {
                Comment.deleteMany({ postId: req.params.id })
                .then(() => {
                  res.status(200).json({ message: 'Le post a été supprimé!'})
                })
                .catch((error) => res.status(400).json({ error }));
              })
              .catch((error) => res.status(400).json({ error }));
          } else {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/posts/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
              .then(() => {
                Comment.deleteMany({ postId: req.params.id })
                .then(() => {
                  res.status(200).json({ message: 'Le post a été supprimé!'})
                })
                .catch((error) => res.status(400).json({ error }));
              })
              .catch((error) => res.status(400).json({ error }));
            })
          }
        }
      })
      .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Liker un post
exports.addLikePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then((result) => {
    //On vérifie si un avis a déjà été donné par l'utilisateur
    if (req.body.likes != 1) {
      return res.status(400).json({ message: "Vous ne pouvez liké le post qu'une seule fois."});
    //On vérifie si l'utilisateur existe
    } else if (req.body.userId === req.auth.userId) {
      //Aimer le post
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
      return res.status(400).json({ message: "Vous devez être connecté pour liker."});
    }
    })
  .catch((error) => res.status(500).json({error}));
};