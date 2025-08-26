const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Pour permettre les requêtes depuis React

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Nom du service Docker ou localhost
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'user_db'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.stack);
        return;
    }
    console.log('Connecté à la base de données MySQL avec l\'ID', db.threadId);
});

// Route d'inscription
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Ici, tu devrais hasher le mot de passe avant de l'insérer
    // Pour cet exemple simple, on l'insère en clair
    const newUser = { username, email, password };

    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Nom d\'utilisateur ou email déjà utilisé.' });
            }
            console.error('Erreur lors de l\'insertion :', err);
            return res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
        }
        res.status(201).json({ message: 'Utilisateur enregistré avec succès !', userId: result.insertId });
    });
});

app.get("/formation", (req, res) => {
  //req
  let sql = "SELECT * FROM users ";
  db.query(sql, (error, result) => {
    if (error) {
      console.log("erreur", error);
    } else {
      console.log("result", result);
      res.status(200).json(result);
    }
  });
});

app.get('/', (req, res) => {

    res.send('API d\'inscription en cours d\'exécution.');
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d\'exécution sur le port ${port}`);
});