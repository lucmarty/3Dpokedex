import React from "react";

interface TeamListProps {
    pokemons: any[];
    onRemovePokemon: (id: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({ pokemons, onRemovePokemon }) => {
    console.log("pokemons", pokemons);
    return (
        <div className="w-fit h-fit grid grid-cols-6 gap-8 justify-start overflow-x-auto p-4 rounded-xl shadow-lg bg-white">
            {pokemons.map((pokemon) => (
                <a
                    href={`/pokemon/${pokemon.id}`}
                    key={pokemon.id}
                    className="relative flex flex-col items-center w-fit cursor-pointer group"
                >
                    <img
                        src={`/sprites/${pokemon.sprites.default}`}
                        alt={pokemon.name.french}
                        className="w-16 h-16 object-contain"
                    />
                    <p className="text-sm mt-2 text-gray-800">{pokemon.name.french}</p>
                    <div
                        className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center 
                                    justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation(); 
                            onRemovePokemon(pokemon.id); 
                        }}
                    >
                        X
                    </div>
                </a>
            ))}
        </div>
    );
};

export default TeamList;
