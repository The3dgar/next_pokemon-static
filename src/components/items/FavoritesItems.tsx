import { Grid } from '@nextui-org/react';
import { FavoriteCard } from './FavoriteCard';

interface Props {
  items: number[]
}

export const FavoritesItems = ({ items }: Props) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
    {items.map((id) => (
      <FavoriteCard key={id} id={id} />
    ))}
  </Grid.Container>
  )
}
