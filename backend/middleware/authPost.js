const isAdmin = false;

module.exports = (req, res, next) => {
    //Vérification de l'utilisateur, ou si c'est un admin
    if (userId.isAdmin != true || post.userId != req.auth.userId) {
        res.status(403).json({ message : 'Seul le propriétaire peut modifier son post.'});
    } else {
        next();
    }
};