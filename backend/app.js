const express = require('express');
const app = express();
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const cors = require ('cors');
require("dotenv").config();

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');
const path = require('path');

//Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODBURL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());

//Header permettant d'éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images/', express.static(path.join(__dirname,'images')));
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/posts', commentRoutes);

module.exports = app;