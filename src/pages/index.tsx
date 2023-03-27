import { GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { GetAllPokemonsResponses, PokemonResult } from '@/interfaces/responses';
import pokeApi from '@/api/pokeApi';

import { Layout } from '@/components/layouts';
import { PokemonCard } from '@/components/items';

interface Props {
  pokemons: PokemonResult[];
}

const HomePage = ({ pokemons }: Props) => {
  return (
    <>
      <Layout title='Home'>
        <Grid.Container gap={2} justify='flex-start'>
          {pokemons.map((p) => (
            <PokemonCard pokemon={p} key={p.id} />
          ))}
        </Grid.Container>
      </Layout>
    </>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<GetAllPokemonsResponses>(
    '/pokemon?limit=151'
  ); // your fetch function here

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

  const pokemons: PokemonResult[] = data.results.map((p, i) => ({
    name: p.name,
    url: p.url,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
