const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pokemon = require('./models/Pokemon');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Votre modèle Mongoose
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ce_truc_est_cense_etre_secret_mais_osef_en_vrai_cest_pas_en_prod';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5002;
// Connexion à la base de données
mongoose.connect(
    "mongodb+srv://lyam:lyam@pokedex.zgwxy.mongodb.net/pokedex",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }



).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Route de  connexion
app.get('/', (req, res) => {
    res.json({ message: 'Backend is running' });
});

// Route pour récupérer tous les Pokémon
app.get('/api/pokemons', async (req, res) => {
    try {
        console.log('Requête reçue pour /api/pokemons');
        const pokemons = await Pokemon.find()
        .then(pokemons => {

            res.json(pokemons);
        });
        //console.log('Pokemons récupérés :', pokemons);

    } catch (err) {
        console.error('Erreur lors de la récupération des Pokémon :', err);
        res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
});
app.get('/api/pokemons/:id', async (req, res) => {
    try {
        console.log('Requête reçue pour /api/pokemons/:id');
        const pokemon = await Pokemon.findOne({ id: req.params.id });
        console.log('Pokemon récupéré :', pokemon);
        res.json(pokemon);
    } catch (err) {
        console.error('Erreur lors de la récupération du Pokémon :', err);
        res.status(500).json({ error: 'Failed to fetch pokemon' });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false, // Par défaut, les utilisateurs ne sont pas admin
        });

        // Enregistrer dans la base
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement" });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

        // Générer un token JWT
        const token = jwt.sign(
            { username: user.username, isAdmin: user.isAdmin },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Connexion réussie',
            token,
            username: user.username,
            isAdmin: user.isAdmin, // Inclure le rôle admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Accès non autorisé' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide' });
        req.user = user;
        next();
    });
};

// Protéger une route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Bienvenue dans une route protégée' });
});





app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
