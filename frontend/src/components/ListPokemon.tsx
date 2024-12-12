import React from 'react';

interface Pokemon {
    id: number;
    name: {
        english: string;
        french: string;
    };
    type: string[];
    base: {
        HP: number;
        Attack: number;
        Defense: number;
        SpAttack: number;
        SpDefense: number;
        Speed: number;
    };
}

interface ListPokemonProps {
    pokemons: Pokemon[];
    onSelectPokemon: (pokemon: Pokemon) => void;
}

const ListPokemon: React.FC<ListPokemonProps> = ({ pokemons, onSelectPokemon }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Liste des Pokémon</h1>
            <div className="overflow-auto border border-gray-300 rounded-md" style={{ maxHeight: '80vh' }}>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-black sticky top-0">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Nom (Anglais)</th>
                            <th className="border border-gray-300 px-4 py-2">Nom (Français)</th>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map((pokemon) => (
                            <tr
                                key={pokemon.id}
                                className="cursor-pointer hover:bg-gray-500"
                                onClick={() => onSelectPokemon(pokemon)}
                            >
                                <td className="border border-gray-300 px-4 py-2 text-center">{pokemon.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{pokemon.name.english}</td>
                                <td className="border border-gray-300 px-4 py-2">{pokemon.name.french}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{pokemon.type.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPokemon;
