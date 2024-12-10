import React, {useEffect, useState} from "react";
import SpriteList from './components/SpritesList';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Team from "./components/Team";
import Menu from "./components/Menu";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Admin from "./components/Admin";
import Register from "./components/Register";


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifie si un token existe dans localStorage (ou un autre moyen d'auth)
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Met à jour l'état selon la présence du token
    }, []);
    return (

     <BrowserRouter>
      <Routes>
        {/* Route pour afficher la liste ou une page d'accueil */}
        <Route path="/" element={<><Menu /><h1>Bienvenue dans le Pokédex</h1> <SpriteList /></>} />

        {/* Route dynamique pour afficher les détails d'un Pokémon */}
        <Route path="/pokemon/:pokemon" element={<><Menu /> <Pokemon /></>} />

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
