import React from 'react';
import { getAllPokemons } from '../utils/PokemonUtils';
import SpriteList from '../components/SpriteList';
import fond from '../assets/fond.png';

const Home: React.FC = () => {
    const pokemons = getAllPokemons().slice(0, 809);

    return (
        <div 
            className="min-h-screen overflow-auto bg-gray-100 bg-cover bg-fixed text-xl md:px-14 lg:px-48"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.9)), url(${fond})`
            }}
        >
            <SpriteList pokemons={pokemons} />
        </div>
    );
};

export default Home;
