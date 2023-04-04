import { Spacer, Text, useTheme, Link } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 50px',
        backgroundColor: theme?.colors.gray50.value,
      }}>
      <Image
        src={
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        }
        alt='navbar icon'
        width={70}
        height={70}
      />
      <Link href='/'>
        <Text h2 color='white'>
          P
        </Text>
        <Text h3 color='white'>
          okémon
        </Text>
      </Link>

      <Spacer css={{ flex: 1 }} />
      <Link href='/favorites'>
        <Text color='white' weight={'bold'}>
          Favoritos
        </Text>
      </Link>
    </div>
  );
};
