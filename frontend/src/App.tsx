import React from "react";
import SpriteList from './components/SpritesList';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";

const App: React.FC = () => {
  return (
     <BrowserRouter>
      <Routes>
        {/* Route pour afficher la liste ou une page d'accueil */}
        <Route path="/" element={<div><h1>Bienvenue dans le Pokédex</h1> <SpriteList /></div>} />

        {/* Route dynamique pour afficher les détails d'un Pokémon */}
        <Route path="/pokemon/:pokemon" element={<Pokemon />} />

      </Routes>
    </BrowserRouter>

  );
};

export default App;
