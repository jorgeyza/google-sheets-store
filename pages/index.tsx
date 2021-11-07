import { useState, useMemo } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Button, Flex, Image, Grid, Link, Stack, Text } from '@chakra-ui/react';

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
      <Stack spacing={6}>
        <Grid
          gridGap={6}
          templateColumns="repeat(auto-fill, minmax(240px,1fr))"
        >
          {products.map((product) => (
            <Stack
              key={product.id}
              backgroundColor="gray.100"
              borderRadius="md"
              padding={4}
              spacing={3}
            >
              <Image
                borderRadius="md"
                maxHeight="150px"
                objectFit="cover"
                src={product.image}
                alt={product.title}
              />
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text color="green.500" fontSize="sm" fontWeight="500">
                  {parseCurrency(product.price)}
                </Text>
              </Stack>
              <Button
                colorScheme="primary"
                size="sm"
                onClick={() => setCart((cart) => cart.concat(product))}
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        {Boolean(cart.length) && (
          <Flex
            position="sticky"
            justifyContent="center"
            bottom={0}
            padding={2}
          >
            <Button
              isExternal
              as={Link}
              colorScheme="whatsapp"
              href={`https://wa.me/510000000000?text=${encodeURIComponent(
                text
              )}`}
            >
              Completar pedido ({cart.length} productos)
            </Button>
          </Flex>
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
