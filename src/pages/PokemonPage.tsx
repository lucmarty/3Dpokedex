import React from 'react';
import { useParams } from "react-router-dom";
import { getPokemonById } from '../utils/PokemonUtils';
import PokemonInformations from '../components/PokemonInformations';

const PokemonPage: React.FC = () => {    
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>Invalid Pokemon ID</div>;
    }
    const pokemon = getPokemonById(parseInt(id));
    if (!pokemon) {
        return <div>Pokemon not found</div>;
    }
    
    return (
        <div>
            <PokemonInformations pokemon={pokemon} />
        </div>
    );
};

export default PokemonPage; 

