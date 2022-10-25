# Projet n°7 - Groupomania

## Comment installer le code?
   * Créer un dossier "Groupomania".
   * Télécharger le code du GitHub puis y mettre les deux dossiers dans celui créé précedemment.
   OU BIEN
   * Faire un git-clone du github

## Comment faire fonctionner le code?
Ouvrir le dossier "Groupomania" dans un éditeur de code. (ex: VS Code)
#### Lancer le frontend :
* Ouvrir un terminal sur le dossier principal puis exécuter 'npm install'.
* Entrer 'cd frontend' dans le terminal pour se rendre dans le dossier frontend.
* Exécuter 'npm run start' pour démarrer le frontend.
* Le serveur frontend se trouve sur le port suivant : http://localhost:3001

#### Lancer le backend :
* Entrer 'cd backend' dans le terminal pour se rendre dans le dossier backend.
* Exécuter 'npm install -g nodemon' pour charger le package nodemon. (si nodemon n'est pas installé)
* Exécuter 'nodemon server' pour démarrer le backend.
* Le serveur backend se trouve sur le port suivant : http://localhost:3000

#### Comment faire fonctionner le code si les packages sont déjà installés?
* Entrer 'npm run start' dans le terminal sur le dossier "frontend".
* Entrer 'nodemon server' dans le terminal sur le dossier "backend".
* Se connecter à l'URL suivante une fois les serveurs lancés : http://localhost:3001

## Qu'est-ce qui a été utilisé?
#### FRONTEND :
- React
- Axios
- moment
- react-icons
- react-phone-number-input
- react-datepicker
- react-dom
- react-router-dom
- redux
- react-redux

#### BACKEND :
- Node.js
- Express
- MongoDB
- mongoose
- mongoose-unique-validator
- password-validator
- bcrypt
- cors
- dotenv
- express-mongo-sanitize
- helmet
- multer
- jsonwebtoken

## Données du compte administrateur?
* Adresse email : admin@email.com
* Mot de passe : IAMTHEadmin60