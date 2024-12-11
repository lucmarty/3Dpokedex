import React from "react";
import SpriteList from './components/SpritesList';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Team from "./components/Team";
import Menu from "./components/Menu";
import Login from "./components/Login";

import Admin from "./components/Admin";
import Register from "./components/Register";


const App: React.FC = () => {

    return (

     <BrowserRouter>
      <Routes>
        {/* Route pour afficher la liste ou une page d'accueil */}
        <Route path="/" element={<><Menu /> <SpriteList /></>} />

        {/* Route dynamique pour afficher les détails d'un Pokémon */}
        <Route path="/pokemon/:id" element={
          <>
            <Menu/>
            <Pokemon/>
          </>
          } />

        <Route path="/team" element={<><Menu /> <Team /></>} />

        <Route path="/login" element={<><Menu /> <Login /></>} />
          <Route
              path="/admin"
              element={

                      <Admin />

              }
          />
          <Route path="/register" element={<><Menu /> <Register /></>} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
