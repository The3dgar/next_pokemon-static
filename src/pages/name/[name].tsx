import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import {
  GetAllPokemonsResponses,
  PokemonByID,
} from '@/interfaces/responses';
import pokeApi from '@/api/pokeApi';
import { toggleFavorite, existInFavorite } from '@/utils/localFavorite';
import { Layout } from '@/components/layouts';
import { getPokemonInfo } from '@/utils';

interface Props {
  pokemon: PokemonByID;
}

const PokemonByName = ({ pokemon }: Props) => {
  const [isInFavorite, setIsInFavorite] = useState(false);

  useEffect(() => {
    const exist = existInFavorite(pokemon.id);
    setIsInFavorite(exist);
  }, [pokemon.id]);

  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);

    if (isInFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0.9,
        y: 0.1,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button
                color={'gradient'}
                ghost={isInFavorite}
                onPress={onToggleFavorite}>
                {isInFavorite ? 'Esta en favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<GetAllPokemonsResponses>(
    `/pokemon/?limit=151`
  );
  const pokemons = data.results.map((p) => p.name);

  return {
    paths: pokemons.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonByName;
