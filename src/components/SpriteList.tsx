import React, { useState } from 'react';
import PokemonType from '../utils/PokemonType';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import { getPokedexFromGame } from '../utils/PokemonUtils';

const SpriteList: React.FC<{ pokemons: PokemonType[] }> = ({ pokemons }) => {
    const [filteredPokemon, setFilteredPokemon] = useState<PokemonType[]>(pokemons);

    const handleSearch = (
        searchText: string,
        selectedType: string,
        selectedType2: string,
        sortOption: string,
        gameOption: string
    ) => {
        // Récupérer les IDs du Pokédex pour le jeu sélectionné
        const gamePokemonIds = gameOption ? getPokedexFromGame(gameOption) : null;

        const filtered = pokemons.filter((pokemon) => {
            const matchesText =
                pokemon.name.french?.toLowerCase().includes(searchText.toLowerCase()) ||
                pokemon.name.english.toLowerCase().includes(searchText.toLowerCase()) ||
                '' + pokemon.id === searchText;

            const matchesFirstType = selectedType === '' || pokemon.type.includes(selectedType);
            const matchesSecondType = selectedType2 === '' || pokemon.type.includes(selectedType2);
            const matchesType = matchesFirstType && matchesSecondType;

            // Filtrer par jeu (si un jeu est sélectionné)
            const matchesGame = gameOption === '' || (gamePokemonIds && gamePokemonIds.includes(pokemon.id));

            return matchesText && matchesType && matchesGame;
        });

        const sorted = filtered.sort((a: PokemonType, b: PokemonType) => {
            if (sortOption !== 'id') {
                return b.base[sortOption as keyof typeof b.base] - a.base[sortOption as keyof typeof a.base];
            } else {
                return a.id - b.id;
            }
        });

        setFilteredPokemon(sorted);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-9 items-center gap-4 overflow-x-auto rounded-xl bg-card p-4 shadow-lg">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default SpriteList;
