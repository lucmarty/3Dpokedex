import React, { useEffect, useState } from "react";

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

const TeamCoverage: React.FC<TeamCoverageProps> = ({ pokemons }) => {
    const [typeDict, setTypeDict] = useState<Record<string, TypeAttributes>>(
        Type.reduce((acc, type) => {
            acc[type] = { immune: 0, resist: 0, neutral: 0, weak: 0 };
            return acc;
        }, {} as Record<string, TypeAttributes>)
    );

    useEffect(() => {
        const newTypeDict = Type.reduce((acc, type) => {
            acc[type] = { immune: 0, resist: 0, neutral: 0, weak: 0 };
            return acc;
        }, {} as Record<string, TypeAttributes>);

        pokemons.forEach((pokemon) => {
            Object.entries(pokemon.coverage).forEach(([type, multiplier]) => {
                if (multiplier === 0) {
                    newTypeDict[type].immune += 1;
                } else if (multiplier === 0.5) {
                    newTypeDict[type].resist += 1;
                } else if (multiplier === 1) {
                    newTypeDict[type].neutral += 1;
                } else if (multiplier === 2) {
                    newTypeDict[type].weak += 1;
                }
            });
        });

        setTypeDict(newTypeDict);
    }, [pokemons]);

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse p-4 rounded-xl bg-white">
                <thead>
                    <tr className="">
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
