import React from "react";
import SpriteList from './components/SpritesList';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Team from "./components/Team";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Slider from "./components/Slider";
import Admin from "./components/Admin";
import Register from "./components/Register";
import Welcome from "./components/Welcome";


const App: React.FC = () => {

    return (

     <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Menu /><Welcome /> <SpriteList /></>} />

        <Route path="/pokemon/:id" element={<><Menu/> <Pokemon/> <Slider/></>} />

        <Route path="/team" element={<><Menu /> <Team /></>} />

        <Route path="/login" element={<><Menu /> <Login /></>} />

        <Route path="/admin" element={<Admin />}/>

        <Route path="/register" element={<><Menu /> <Register /></>} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
