import React from "react";
import PokemonViewer from "./components/PokemonView";
import SpriteList from './components/SpritesList';


const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Pokedex 3D</h1>
      {/* <PokemonViewer modelPath="/models/eevee.glb" /> */}
      <SpriteList />

    </div>
    
    
  );
};

export default App;
