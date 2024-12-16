import data from '../assets/pokemons.json';
import PokemonType from '../utils/PokemonType';

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
