import { ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Edgar Olivar' />
        <meta
          name='description'
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <main
        style={{
          padding: '0px 20px',
        }}>
        {children}
      </main>
    </>
  );
};
