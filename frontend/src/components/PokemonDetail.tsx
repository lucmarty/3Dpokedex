import React from "react";

interface PokemonDetailProps {
    pokemon: {
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
            "Sp. Attack": number;
            "Sp. Defense": number;
            Speed: number;
        };
        sprites: {
            default: string;
        };
    };
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({pokemon}) => {
    return (
        console.log(pokemon.base),
        <>
            <h1 className="text-2xl font-semibold mb-4">Détails de {pokemon.name.french}</h1>
            <div className="bg-black text-white p-4 rounded shadow-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">{pokemon.name.french} ({pokemon.name.english})</h2>
                <div className="flex flex-col items-center">
                    <img
                        src={`/sprites/${pokemon.sprites?.default || "placeholder.png"}`}
                        alt={pokemon.name.french}
                        className="w-32 h-32 object-contain mb-4"
                    />
                    <div className="flex w-full flex-col items-start justify-start">
                        <p className="mb-2"><strong>ID:</strong> {pokemon.id}</p>
                        <p className="mb-2"><strong>Nom (Anglais):</strong> {pokemon.name.english}</p>
                        <p className="mb-2"><strong>Type:</strong> {pokemon.type.join(", ")}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Statistiques</h3>
                    <ul className="grid grid-cols-2 gap-2">
                        <li><strong>HP:</strong> {pokemon.base.HP}</li>
                        <li><strong>Attack:</strong> {pokemon.base.Attack}</li>
                        <li><strong>Defense:</strong> {pokemon.base.Defense}</li>
                        <li><strong>Sp. Attack:</strong> {pokemon.base["Sp. Attack"]}</li>
                        <li><strong>Sp. Defense:</strong> {pokemon.base["Sp. Defense"]}</li>
                        <li><strong>Speed:</strong> {pokemon.base.Speed}</li>
                    </ul>
                </div>
            </div>
        </>
    );

};

export default PokemonDetail;
