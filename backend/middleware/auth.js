const jwt = require('jsonwebtoken');
require("dotenv").config();
const TOKEN = process.env.TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${TOKEN}`);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        const isAdmin = decodedToken.isAdmin;
        if (userId !== req.auth.userId) {
            if (isAdmin !== true) {
                res.status(401).json({ message: "Vous n'êtes pas un administrateur." });
            } else {
                next();
            }
            res.status(401).json({ message: "Vous n'avez pas l'autorisation." });
        } else {
            next();
        }
    } catch(error) {
         res.status(401).json({ message: "Vous n'avez pas l'autorisation." });
    }
};