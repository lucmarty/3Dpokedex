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

// Route pour récupérer les statistiques maximales pour le graphe hexagone
app.get('/api/pokemons/max-stats', async (req, res) => {
    try {
        console.log('Requête reçue pour /api/pokemons/max-stats');

        const maxStats = await Pokemon.aggregate([
            {
                $group: {
                    _id: null, 
                    maxHP: { $max: "$base.HP" },
                    maxAttack: { $max: "$base.Attack" },
                    maxDefense: { $max: "$base.Defense" },
                    maxSpAttack: { $max: "$base.Sp. Attack" },
                    maxSpDefense: { $max: "$base.Sp. Defense" },
                    maxSpeed: { $max: "$base.Speed" }
                }
            },
            {
                $project: {
                    _id: 0, 
                    maxHP: 1,
                    maxAttack: 1,
                    maxDefense: 1,
                    maxSpAttack: 1,
                    maxSpDefense: 1,
                    maxSpeed: 1
                }
            }
        ]);

        res.json(maxStats[0] || {}); 
    } catch (err) {
        console.error('Erreur lors de la récupération des statistiques maximales :', err);
        res.status(500).json({ error: 'Failed to fetch max stats' });
    }
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
