import React from "react";
import SpriteList from './components/SpritesList';
import Menu from './components/Menu';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
     <BrowserRouter>
      <Routes>
        {/* Route pour afficher la page d'accueil */}
        <Route path="/" element={<><Menu /><h1>Bienvenue dans le Pokédex</h1> <SpriteList /></>} />

        {/* Route dynamique pour afficher les détails d'un Pokémon */}
        <Route path="/pokemon/:pokemon" element={<><Menu /> <Pokemon /></>} />
        
        {/* Route pour afficher la page de connexion */}
        <Route path="/login" element={<><Menu /> <Login /></>} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
