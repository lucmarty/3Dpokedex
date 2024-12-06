const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://user:user@pokedex.ozdzn.mongodb.net/pokemon',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(async () => {
    console.log('Connecté à MongoDB');
    const pokemons = await mongoose.connection.db.collection('pokedex').find({}).toArray();
    console.log('Pokemons trouvés :', pokemons);
    mongoose.disconnect();
}).catch(err => {
    console.error('Erreur de connexion :', err);
});