const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

//Schéma avec les conditions pour le mot de passe
passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase(2)
.has().lowercase()
.has().digits(2)
.has().not().spaces()

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({ message: "Le mot de passe doit être composé de 8 caractères minimum, deux majuscules et deux chiffres." });
    }
};