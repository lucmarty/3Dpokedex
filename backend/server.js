const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

mongoose.connect(
  "mongodb+srv://user:user@pokedex.ozdzn.mongodb.net/?retryWrites=true&w=majority&appName=Pokedex",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
