import React from "react";
import AddToTeamButton from "./AddToTeamButton";
import EvolutionFamily from "./EvolutionFamily";
import GenderBar from "./GenderBar";
import height from "../assets//icons8-height-32.png";
import weight from "../assets/icons8-weight-kg-64.png";

interface PokemonInformationsProps {
    selectedPokemon: any;
    team: number[];
    setTeam: React.Dispatch<React.SetStateAction<number[]>>;
    evolutionFamily: any[];
}

const PokemonInformations: React.FC<PokemonInformationsProps> = ({
    selectedPokemon,
    team,
    setTeam,
    evolutionFamily,
}) => {
    const info = selectedPokemon?.info;

    return (
        <>
            <div className="max-w-[20vw] text-xl bg-gray-100/80 text-black rounded-xl p-4 shadow-2xl absolute right-10 top-16 pointer-events-none">
                {/* types */}
                <div className="flex justify-between w-full">
                    {selectedPokemon?.type?.map((t: string, index: number) => (
                        <img
                            key={`${t}-${index}`}
                            src={`/types/${t.toLowerCase()}.png`}
                            alt={t}
                            className="m-1 mb-2"
                        />))}
                </div>
                <div className="flex flex-col w-full  items-center">
                    {/* sprite, nom et numéro */}
                    <div className="flex flex-col items-center p-4">
                        <img
                            className="flex w-16 h-16 align-middle"
                            src={`/sprites/${selectedPokemon?.sprites?.default || "default.png"}`}
                            alt={selectedPokemon?.name?.french || "Pokémon"}
                        />
                        <h2 className="w-fit">
                            N° {selectedPokemon?.id} -{" "} {selectedPokemon?.name?.french || "Nom inconnu"}
                        </h2>
                    </div>

                    {/* genre */}
                    {(selectedPokemon?.info?.percent_male !== null && selectedPokemon?.info?.percent_female !== null) && (
                        <GenderBar
                            percentMale={selectedPokemon?.info?.percent_male}
                            percentFemale={selectedPokemon?.info?.percent_female}
                        />
                    )
                    }

                    {/* taille et poids */}
                    <div className="flex justify-around w-full p-4">
                        <div className="flex flex-row items-center">
                            <img
                                src={height} alt="height"
                                className="w-8 h-8 inline"
                            />
                            {info?.height_m || 0} m
                        </div>
                        <div className="flex flex-row items-center">
                            <img
                                src={weight} alt="weight"
                                className="w-9 h-9 inline"
                            />
                            {info?.weight_kg || 0} Kg
                        </div>
                    </div>

                    <div>
                        <p className="text-center p-4 pt-0">
                            {info?.description || "Aucune description"}
                        </p>
                        {info?.is_sublegendary === 1 || info?.is_legendary === 1 ? (
                            <p className="text-center text-yellow-500">Ce Pokémon est légendaire</p>
                        ) : info?.is_mythical === 1 ? (
                            <p className="text-center text-red-600">Ce Pokémon est mythique</p>
                        ) : null}
                    </div>
                    <div className="p-4 pt-0">
                        {selectedPokemon?.evo?.evochain_2 !== "" && (
                            <EvolutionFamily evolutionFamily={evolutionFamily} />
                        )}
                    </div>


                    <AddToTeamButton team={team} setTeam={setTeam} pokemon={selectedPokemon} />
                </div>
                {/* <p>
                    <span className="underline">Talents : </span>
                </p>
                {selectedPokemon?.abilities?.map((a: string, index: number) => (
                    <p key={`${a}-${index}`}>
                        {index === 3 ? "(caché) " : ""}
                        {a}
                    </p>
                ))} */}
            </div>
        </>
    );
};

export default PokemonInformations;
