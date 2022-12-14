const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();
const TOKEN = process.env.TOKEN;

//Usage de regex pour valider les données
emailValidity = (email) => {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}
usernameValidity = (username) => {
    return /^[A-Z][A-Za-z\é\è\ê\s\-]{2,16}$/.test(username);
}
adressValidity = (adress) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(adress);
}
phoneValidity = (phone) => {
    return /^(\+)[0-9]{11}$/.test(phone);
}
jobValidity = (job) => {
    return /^[A-Z][A-Za-z\é\è\ê\s\-]{2,30}$/.test(job);
}

//Inscription
exports.signup = (req, res, next) => {
    if (emailValidity(req.body.email)) {
        if (usernameValidity(req.body.username)) {
            if (adressValidity(req.body.adress)) {
                if (phoneValidity(req.body.phone)) {
                    if (jobValidity(req.body.job)) {
                        bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User({
                                email: req.body.email,
                                password: hash,
                                username: req.body.username,
                                picture: null,
                                isAdmin : false,
                                birthday: req.body.birthday,
                                adress: req.body.adress,
                                phone: req.body.phone,
                                job: req.body.job,
                                jobdate: new Date().toLocaleString(),
                            });
                            user.save()
                            .then(() => res.status(201).json({ message: 'Compte créé!' }))
                            .catch(error => res.status(400).json({ message: 'Une information est incorrect.' }));
                        })
                        .catch(error => res.status(500).json({ error }));
                    } else {
                        return res.status(401).json({ message: "Veuillez choisir un travail existant." });
                    }
                } else {
                    return res.status(401).json({ message: "Veuillez choisir un numéro de téléphone valide." });
                }
            } else {
                return res.status(401).json({ message: "Veuillez utiliser une adresse existante." });
            }
        } else {
            return res.status(401).json({ message: "Veuillez choisir un nom d'utilisateur valide." });
        }
    } else {
        return res.status(401).json({ message: 'Veuillez choisir une adresse mail valide.' });
    }
};

//Se connecter
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ message: 'Une information est incorrect.' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message: 'Informations incorrectes.' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign (
                            { userId: user._id, isAdmin: user.isAdmin },
                            `${TOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Retrouver tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    User.find()
    .then ((users) => {res.status(200).json(users)})
    .catch ((error) => {res.status(400).json({ message: error })});
};

//Retrouver un seul utilisateur
exports.getOneUser = (req, res, next) => {
    User.findById(req.params.id)
    .then ((users) => {res.status(200).json(users)})
    .catch ((error) => {res.status(400).json({ message: error })});
};

//Changer l'image de profil
exports.putProfilePicture = (req, res, next) => {
    const userData = req.file ? {
        userId: req.auth.userId,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,} : { ...req.body };
    delete userData._userId;
    if (req.file === undefined) {
        res.status(403).json({ message : 'Il faut envoyer une image.'});
    } else {
        User.findOne({_id: req.params.id})
        .then((user) => {
        if (user.id != req.auth.userId) {
            res.status(403).json({ message : 'Seul le propriétaire peut modifier son avatar.'});
        } else {
            User.updateOne(
                { _id: req.params.id}, 
                { ...userData, _id: req.params.id}
                )
            .then(() => res.status(200).json({ message : "Votre avatar a été changé."}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {res.status(403).json({ error })});
    }

};