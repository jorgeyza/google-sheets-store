import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  Container,
  Image,
  VStack,
  Heading,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';

import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          borderRadius="sm"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image
              alt="Logo"
              maxHeight="128px"
              src="https://cdn-icons-png.flaticon.com/512/273/273177.png"
            />
            <Heading>La tiendita online</Heading>
            <Text>Pedidos al WhatsApp</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
