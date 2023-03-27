import pokeApi from '@/api/pokeApi';
import { PokemonByID } from '@/interfaces/responses';

export const getPokemonInfo = async (selector: string) => {
  const { data } = await pokeApi.get<PokemonByID>(`/pokemon/${selector}`);

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };

  return pokemon;
};
