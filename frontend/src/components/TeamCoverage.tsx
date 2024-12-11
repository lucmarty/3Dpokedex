import React from "react";

interface TeamCoverageProps {
    pokemons: any[];
    onRemovePokemon: (id: number) => void;
}

const Type: string[] = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
];

const TeamCoverage: React.FC<TeamCoverageProps> = ({ pokemons, onRemovePokemon }) => {
    // Remplir les colonnes vides si moins de 6 Pokémon
    const paddedPokemons = [
        ...pokemons,
        ...Array.from({ length: 6 - pokemons.length }, (_, i) => null),
    ];

    // Fonction pour obtenir la classe CSS basée sur le multiplicateur
    const getMultiplierClass = (multiplier: number | undefined) => {
        if (!multiplier || multiplier === 1) return "text-gray-800"; 
        if (multiplier >= 4) return "text-red-600 font-bold"; 
        if (multiplier >= 2) return "text-red-400"; 
        if (multiplier < 1) return "text-green-600"; 
        return "text-gray-800"; 
    };

    return (
        <div className="overflow-x-auto shadow-2xl">
            <table className="table-auto border-collapse p-4 rounded-xl bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700"></th>
                        {paddedPokemons.map((pokemon, index) => (
                            <th
                                key={pokemon ? pokemon.id : `placeholder-${index}`}
                                className="px-4 py-2 border-b text-sm font-medium text-gray-700 w-24"
                            >
                                {pokemon ? (
                                    <div className="relative group">
                                        <img
                                            src={`/sprites/${pokemon.sprites.default}`}
                                            alt={pokemon.name.french}
                                            className="w-14 h-14 object-contain"
                                        />
                                        <p className="text-sm mt-2 text-gray-800">{pokemon.name.french}</p>
                                        <div
                                            className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemovePokemon(pokemon.id);
                                            }}
                                        >
                                            X
                                        </div>
                                    </div>
                                ) : " "}
                            </th>
                        ))}
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Total Faiblesses</th>
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Total Résistances</th>
                    </tr>
                </thead>
                <tbody>
                    {Type.map((type) => {
                        let totalWeaknesses = 0;
                        let totalResistances = 0;

                        paddedPokemons.forEach((pokemon) => {
                            const multiplier = pokemon?.coverage[type];
                            if (multiplier > 1) totalWeaknesses++;
                            else if (multiplier < 1) totalResistances++;
                        });

                        return (
                            <tr key={type} className="border-b">
                                {/* Type Icon */}
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    <img
                                        className="w-20 object-contain"
                                        src={`/types/${type}.png`}
                                        alt={type}
                                    />
                                </td>
                                {/* Multipliers for each Pokémon */}
                                {paddedPokemons.map((pokemon, index) => {
                                    const multiplier = pokemon?.coverage[type];
                                    return (
                                        <td
                                            key={pokemon ? pokemon.id : `placeholder-${index}`}
                                            className={`px-4 py-2 text-sm text-center w-24 ${getMultiplierClass(multiplier)}`}
                                        >
                                            {multiplier != null && multiplier !== 1 ? `x${multiplier}` : multiplier === 0 ? "x0" : " "}
                                        </td>
                                    );
                                })}
                                {/* Totaux */}
                                <td className="px-4 py-2 text-sm text-gray-800 text-center w-24">
                                    {totalWeaknesses === 0 ? " " : totalWeaknesses}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800 text-center w-24">
                                    {totalResistances === 0 ? " " : totalResistances}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamCoverage;
