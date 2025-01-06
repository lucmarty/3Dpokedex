import React from 'react';
import { getAllPokemons } from '../utils/PokemonUtils';
import SpriteList from '../components/SpriteList';

const Home: React.FC = ()=> {
    const pokemons = getAllPokemons().slice(0, 809);
    return (
        <div className=" ">
            <SpriteList pokemons={pokemons}/>
        </div>
    );
};

export default Home; 