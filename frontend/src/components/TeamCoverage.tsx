import React from "react";

interface TeamCoverageProps {
    pokemons: any[];
}

type TypeAttributes = {
    immune: number;
    resist: number;
    neutral: number;
    weak: number;
};

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
    "fairy"
];

// Initialisation de typeDict avec des valeurs par défaut
const typeDict: Record<string, TypeAttributes> = Type.reduce((acc, type) => {
    acc[type] = { immune: 0, resist: 0, neutral: 0, weak: 0 };
    return acc;
}, {} as Record<string, TypeAttributes>);

const TeamCoverage: React.FC<TeamCoverageProps> = ({ pokemons }) => {
    // Parcours des pokemons et mise à jour de typeDict
    pokemons.forEach((pokemon) => {
        Object.entries(pokemon.coverage).forEach(([type, multiplier]) => {
            if (multiplier === 0) {
                typeDict[type].immune += 1;
            } else if (multiplier === 0.5) {
                typeDict[type].resist += 1;
            } else if (multiplier === 1) {
                typeDict[type].neutral += 1;
            } else if (multiplier === 2) {
                typeDict[type].weak += 1;
            }
        });
    });

    // Affichage du tableau
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Immune</th>
                        <th>Resist</th>
                        <th>Neutral</th>
                        <th>Weak</th>
                    </tr>
                </thead>
                <tbody>
                    {Type.map((type) => (
                        <tr key={type}>
                            <td>{type}</td>
                            <td>{typeDict[type].immune}</td>
                            <td>{typeDict[type].resist}</td>
                            <td>{typeDict[type].neutral}</td>
                            <td>{typeDict[type].weak}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamCoverage;
