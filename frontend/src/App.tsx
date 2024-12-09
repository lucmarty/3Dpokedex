import React from "react";
import SpriteList from './components/SpritesList';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Team from "./components/Team";
import Menu from "./components/Menu";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
     <BrowserRouter>
      <Routes>
        {/* Route pour afficher la liste ou une page d'accueil */}
        <Route path="/" element={
          <div className="bg-gray-100 min-h-screen">
            <Menu/>
            <h1 className="text-center pt-4 pb-4 text-black">Bienvenue dans le Pokédex</h1>
            <SpriteList/>
          </div>
        } />

        {/* Route dynamique pour afficher les détails d'un Pokémon */}
        <Route path="/pokemon/:pokemon" element={
          <>
            <Menu/>
            <Pokemon/>
          </>
          } />

        <Route path="/team" element={
          <>
            <Menu/>
            <Team/>
          </>
        } />     
        
        <Route path="/login" element={<><Menu /> <Login /></>} />     
      </Routes>
    </BrowserRouter>    
  );
};

export default App;