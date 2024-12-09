const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: {
        english: { type: String, required: true },
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
    abilities: [{ type: String }],
    coverage: {
        normal: { type: Number },
        fire: { type: Number },
        water: { type: Number },
        electric: { type: Number },
        grass: { type: Number },
        ice: { type: Number },
        fighting: { type: Number },
        poison: { type: Number },
        ground: { type: Number },
        flying: { type: Number },
        psychic: { type: Number },
        bug: { type: Number },
        rock: { type: Number },
        ghost: { type: Number },
        dragon: { type: Number },
        dark: { type: Number },
        steel: { type: Number },
        fairy: { type: Number }
    },
    evo: {
        evochain_0: { type: String },
        evochain_1: { type: String },
        evochain_2: { type: String },
        evochain_3: { type: String },
        evochain_4: { type: String },
        evochain_5: { type: String },
        evochain_6: { type: String },
        gigantamax: { type: String },
        mega_evolution: { type: String },
        mega_evolution_alt: { type: String },
    },
    info: {
        classification: { type: String },
        percent_male: { type: Number },
        percent_female: { type: Number },
        height_m: { type: Number },
        weight_kg: { type: Number },
        description: { type: String },
        is_sublegendary: { type: Number },
        is_legendary: { type: Number },
        is_mythical: { type: Number },
    },
    sprites: {
        default: { type: String },
    },
});

module.exports = mongoose.model('pokemon', pokemonSchema, 'pokemons');
