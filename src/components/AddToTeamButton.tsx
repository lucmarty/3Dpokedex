import React from "react";

const PokemonAddToTeam: React.FC<{
  selectedPokemon: { name: { english: string; french: string } };
  team: string[];
  setTeam: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedPokemon, team, setTeam }) => {
  const handleAddPokemon = () => {
    if (team.length >= 6) {
      alert("Votre équipe est déjà au complet !");
      return;
    }
    if (team.includes(selectedPokemon.name.english)) {
      alert(`${selectedPokemon.name.french} est déjà dans votre équipe !`);
      return;
    }
    setTeam((prev) => [...prev, selectedPokemon.name.english]);
    alert(`${selectedPokemon.name.french} a été ajouté à votre équipe !`);
  };

  return <button onClick={handleAddPokemon}>Ajouter à la team</button>;
};

export default PokemonAddToTeam;
