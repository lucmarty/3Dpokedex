import React, { useEffect, useState } from 'react';

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
    onSelectPokemon: (pokemon: Pokemon) => void;
}

const PokemonAdminList: React.FC<ListPokemonProps> = ({ onSelectPokemon }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/pokemons');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des Pokémon.');
                }
                const data = await response.json();
                setPokemons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) {
        return <p>Chargement des Pokémon...</p>;
    }

    if (error) {
        return <p className="text-red-500">Erreur : {error}</p>;
    }

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

export default PokemonAdminList;
