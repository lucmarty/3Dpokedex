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

const typeDict: Record<string, TypeAttributes> = Type.reduce((acc, type) => {
    acc[type] = { immune: 0, resist: 0, neutral: 0, weak: 0 };
    return acc;
}, {} as Record<string, TypeAttributes>);

const TeamCoverage: React.FC<TeamCoverageProps> = ({ pokemons }) => {
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

    return (
        <div>
            <table className=" table-auto border-collapse  p-4 rounded-xl shadow-lg bg-white">
                <thead>
                    <tr className="text-left">
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Type</th>
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Immune</th>
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Resist</th>
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Neutral</th>
                        <th className="px-4 py-2 border-b text-sm font-medium text-gray-700">Weak</th>
                    </tr>
                </thead>
                <tbody>
                    {Type.map((type) => (
                        <tr key={type} className="border-b">
                            <td className="px-4 py-2 text-sm text-gray-800">
                                <img
                                    className="w-20 object-contain"
                                    src={"/types/" + type + ".png"}
                                    alt={type}
                                />
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">{typeDict[type].immune}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{typeDict[type].resist}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{typeDict[type].neutral}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{typeDict[type].weak}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamCoverage;
