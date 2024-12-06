const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Charger les utilisateurs depuis un fichier JSON
let users = [];
const usersFilePath = path.join(__dirname, 'users.json');

function loadUsers() {
    try {
        if (fs.existsSync(usersFilePath)) {
            users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        }
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
    }
}

function saveUsers() {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des utilisateurs :", error);
    }
}

loadUsers();

// Secret pour JWT
const SECRET_KEY = 'votre_cle_secrete';

// Fonction de validation des entrées
function validateInput(username, password) {
    if (!username || !password) {
        return "Nom d'utilisateur et mot de passe sont requis.";
    }
    if (password.length < 6) {
        return "Le mot de passe doit contenir au moins 6 caractères.";
    }
    return null;
}

// Route d'inscription
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const validationError = validateInput(username, password);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).send("Un utilisateur avec ce nom existe déjà.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers();
    res.status(201).send("Utilisateur créé avec succès !");
});

// Route de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(400).send("Nom d'utilisateur ou mot de passe incorrect.");
    }
});

// Middleware d'authentification
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send("Accès refusé.");

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send("Token invalide.");
        req.user = user;
        next();
    });
}

// Route protégée par l'authentification
app.get('/profile', authenticateToken, (req, res) => {
    res.status(200).send(`Bienvenue, ${req.user.username} !`);
});

// Servir les fichiers HTML
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
