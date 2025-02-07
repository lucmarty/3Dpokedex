import data from '../assets/pokemons.json';
import PokemonType from '../utils/PokemonType';
import types from '../assets/types.json';
import games from '../assets/games.json';

const pokemons: PokemonType[] = data as PokemonType[];

const pokemonIndex: Record<number, PokemonType> = pokemons.reduce(
  (acc: Record<number, PokemonType>, pokemon: PokemonType) => {
    acc[pokemon.id] = pokemon;
    return acc;
  },
  {} as Record<number, PokemonType>
);

export const getPokemonById = (id: number): PokemonType | null => {
  return pokemonIndex[id] || null;
};

export const getAllPokemons = (): PokemonType[] => {
  return pokemons;
};

export const getPokemonFamily = (pokemon: PokemonType): PokemonType[] | null => { 
  const family: PokemonType[] = []; 
  const evoChains = [
    pokemon.evo.evochain_0,
    pokemon.evo.evochain_1,
    pokemon.evo.evochain_2,
    pokemon.evo.evochain_3,
    pokemon.evo.evochain_4,
    pokemon.evo.evochain_5,
    pokemon.evo.evochain_6,
  ];

  evoChains.forEach((evoName) => {
    if (evoName) {
      const evoPokemon = pokemons.find(p => p.name.english === evoName);
      if (evoPokemon) {
        family.push(evoPokemon);
      }
    }
  });

  pokemons.forEach((p) => {
    if (p.evo.evochain_0 === pokemon.name.english ||
      p.evo.evochain_1 === pokemon.name.english ||
      p.evo.evochain_2 === pokemon.name.english ||
      p.evo.evochain_3 === pokemon.name.english ||
      p.evo.evochain_4 === pokemon.name.english ||
      p.evo.evochain_5 === pokemon.name.english ||
      p.evo.evochain_6 === pokemon.name.english) {
      if (!family.includes(p)) {
        family.push(p);
      }
    }
  });

  if (!family.includes(pokemon)) {
    family.push(pokemon);
  }

  return family;
};

export const getPokemonGLTFPath = (pokemon: PokemonType): string => {  
  if (!pokemon.name.english) {
    return "";
  }
  let name = pokemon.name.english.toLowerCase();
  name = name.replace("♀", "F")
  .replace("♂", "M")
  .replace(" ", "")
  .replace(".", "");
  return `${import.meta.env.BASE_URL}models/${name}/${name}` + ".glb";
}

export const getFrenchTypes = (): string[] => {
  return Object.values(types).map((type) => type.french);
};

export const getTypes = (): typeof types => {
  return types;
};

export const getGamesName = (): string[] => {
  return Object.keys(games);
};

export const getPokedexFromGame = (gameName: string): number[] => {
  if (!Object.prototype.hasOwnProperty.call(games, gameName)) {
    return [];
  }
  const game = games[gameName as keyof typeof games];
  if (!game || !game.pokedex) {
    return [];
  }
  return game.pokedex.map((entry: { id: number }) => entry.id);
};