export const getFavoritesPokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

export const toggleFavorite = (id: number) => {
  let favorites: number[] = getFavoritesPokemons();

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const existInFavorite = (id: number) => {
  if (typeof window === 'undefined') return false;
  const favorites = getFavoritesPokemons();

  return favorites.includes(id);
};

