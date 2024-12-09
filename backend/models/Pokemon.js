const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: {
        english: { type: String, required: true },
        japanese: { type: String },
        chinese: { type: String },
        french: { type: String },
    },
    type: [{ type: String }],
    base: {
        HP: { type: Number },
        Attack: { type: Number },
        Defense: { type: Number },
        "Sp. Attack": { type: Number },
        "Sp. Defense": { type: Number },
        Speed: { type: Number },
    },
    sprites: {
        default: { type: String },
    },
});

module.exports = mongoose.model('pokemon', pokemonSchema, 'pokemons');
