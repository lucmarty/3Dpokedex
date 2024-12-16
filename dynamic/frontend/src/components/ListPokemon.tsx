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
        <>
            <h1 className="text-2xl fontBebasLavrai text-black bg-gray-100 rounded-lg shadow-lg px-8 py-2 w-fit mb-4">Liste des Pokémon</h1>
            <div className="h-[65vh] overflow-auto border border-gray-300 rounded-2xl" style={{ maxHeight: '80vh' }}>
                <table className="table-auto w-full bg-gray-100 rounded-2xl text-black border-collapse">
                    <thead>
                        <tr className="bg-red-400 sticky top-0">
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
        </>
    );
};

export default ListPokemon;
