import { useEffect, useState } from 'react';

import { Layout } from '@/components/layouts';
import { NoFavorites } from '@/components/ui';
import { FavoritesItems } from '@/components/items';

import { getFavoritesPokemons } from '@/utils';

const FavoritesPage = () => {
  const [favPokemons, setFavPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavPokemons(getFavoritesPokemons());
  }, []);

  return (
    <Layout title='Pokémons - Favoritos'>
      {favPokemons.length ? (
        <FavoritesItems items={favPokemons} />
      ) : (
        <NoFavorites />
      )}
    </Layout>
  );
};

export default FavoritesPage;
