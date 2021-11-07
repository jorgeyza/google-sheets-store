import { useState, useMemo } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Button, Grid, Link, Stack, Text } from '@chakra-ui/react';

import api from '../product/api';
import { Product } from '../product/types';

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(value);
}

const Home: NextPage<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title} - ${parseCurrency(product.price)}\n`
            ),
          ``
        )
        .concat(
          `\nTotal: ${parseCurrency(
            cart.reduce((total, product) => total + product.price, 0)
          )}`
        ),
    [cart]
  );

  return (
    <>
      <Head>
        <title>My Store</title>
        <meta name="description" content="Store managed with Google Sheets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <Grid
          gridGap={6}
          templateColumns="repeat(auto-fill, minmax(240px,1fr))"
        >
          {products.map((product) => (
            <Stack backgroundColor="gray.100" key={product.id}>
              <Text>{product.title}</Text>
              <Text>{parseCurrency(product.price)}</Text>
              <Button
                colorScheme="blue"
                onClick={() => setCart((cart) => cart.concat(product))}
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        {Boolean(cart.length) && (
          <Button
            as={Link}
            href={`https://wa.me/51989109732?text=${encodeURIComponent(text)}`}
            isExternal
            colorScheme="whatsapp"
          >
            Completar pedido ({cart.length} productos)
          </Button>
        )}
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.getProducts();
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

export default Home;
