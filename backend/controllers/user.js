const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();
const TOKEN = process.env.TOKEN;

//Validité de l'adresse email avec regEx
emailValidity = (email) => {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

//Validité du pseudo avec regEx
usernameValidity = (username) => {
    return /^[a-zA-Z0-9_-]{4,16}$/.test(username);
}

//Inscription
exports.signup = (req, res, next) => {
    if (emailValidity(req.body.email)) {
        if (usernameValidity(req.body.username)) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    username: req.body.username
                });
                user.save()
                .then(() => res.status(201).json({ message: 'Compte créé!' }))
                .catch(error => res.status(400).json({ message: 'Informations déjà utilisées!' }));
            })
            .catch(error => res.status(500).json({ error })); 
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
                            { userId: user._id },
                            `${TOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};