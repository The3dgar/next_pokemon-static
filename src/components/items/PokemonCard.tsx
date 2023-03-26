import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { PokemonResult } from '@/interfaces/responses';

interface Props {
  pokemon: PokemonResult;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, img, name, url } = pokemon;
  const router = useRouter();
  const onClick = async () => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <Grid key={id} xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onClick={onClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width='100%' height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify='space-between'>
            <Text transform='capitalize'>{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
