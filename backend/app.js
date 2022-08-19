const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://iceglacis:120799@cluster0.63ndytk.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;