import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route pour afficher la liste ou une page d'accueil */}
        <Route path="/" element={<h1>Bienvenue dans le Pokédex</h1>} />

        {/* Route dynamique pour afficher les détails d'un Pokémon */}
        <Route path="/pokemon/:pokemon" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
