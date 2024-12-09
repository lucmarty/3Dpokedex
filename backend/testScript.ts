const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://lyam:lyam@pokedex.zgwxy.mongodb.net/pokedex',

    { useNewUrlParser: true, useUnifiedTopology: true }
).then(async () => {
    console.log('Connecté à MongoDB');
    const pokemons = await mongoose.connection.db.collection('pokemons').find({}).toArray();
    console.log('Pokemons trouvés :', pokemons);
    mongoose.disconnect();
}).catch(err => {
    console.error('Erreur de connexion :', err);
});