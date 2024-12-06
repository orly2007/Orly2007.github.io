const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users = [];

// Charger les utilisateurs depuis un fichier JSON
if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json'));
}

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htm.html');
});

// Route de connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.send('Connexion réussie ! Bienvenue à la page d\'accueil.');
    } else {
        res.status(401).send('Identifiants incorrects.');
    }
});

// Route d'inscription
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).send('Cet email est déjà utilisé.');
    }

    users.push({ email, password });
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.send('Inscription réussie. Vous pouvez maintenant vous connecter.');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

