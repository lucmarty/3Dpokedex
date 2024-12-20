import React, { useMemo } from 'react';
import { useParams } from "react-router-dom";
import { getPokemonById } from '../utils/PokemonUtils';
import PokemonInformations from '../components/PokemonInformations';
import Pokemon3D from '../components/Pokemon3D';

const PokemonPage: React.FC = () => {    
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>Invalid Pokemon ID</div>;
    }
    const pokemon = getPokemonById(parseInt(id));
    if (!pokemon) {
        return <div>Pokemon not found</div>;
    }

    const modelPath = useMemo(() => {
        if (!pokemon.name.english) {
          return "";
        }
        return `/models/${pokemon.name.english.toLowerCase()}/${pokemon.name.english.toLowerCase()}` + ".glb";
      }, [pokemon]);

    
    return (
        <div>
            <Pokemon3D modelPath={modelPath} />
            <PokemonInformations pokemon={pokemon} />
        </div>
    );
};

export default PokemonPage; 

