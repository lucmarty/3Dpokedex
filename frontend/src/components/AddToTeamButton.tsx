import React from "react";

interface AddToTeamButtonProps {
  team: string[];
  setTeam: (team: number[]) => void;
  pokemon: any; // Adaptez si nécessaire.
}

const AddToTeamButton: React.FC<AddToTeamButtonProps> = ({ team, setTeam, pokemon }) => {
  const handleAddPokemon = () => {
    if (team.length >= 6) {
      alert("Votre équipe est déjà au complet !");
      return;
    }
    if (team.includes(pokemon.id)) {
      alert(`${pokemon.name.french} est déjà dans votre équipe !`);
      return;
    }
    setTeam([...team, pokemon.id]);
    alert(`${pokemon.name.french} a été ajouté à votre équipe !`);
  };

  return <button className="pointer-events-auto border border-2 border-gray-400 rounded-xl py-2 px-4 hover:bg-green-700 hover:text-gray-100 hover:border-green-700" onClick={handleAddPokemon}>Ajouter à la team</button>;
};

export default AddToTeamButton;
