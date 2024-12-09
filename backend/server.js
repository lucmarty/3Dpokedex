const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pokemon = require('./models/Pokemon');

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
            console.log('Pokemons récupéreeeeeeeeeés :', pokemons);
            res.json(pokemons);
        });
        //console.log('Pokemons récupérés :', pokemons);
        res.json(pokemons);
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




app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
