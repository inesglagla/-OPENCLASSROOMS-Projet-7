const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const userRoutes = require('./routes/user');

//Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODBURL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//Header permettant d'éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);

module.exports = app;