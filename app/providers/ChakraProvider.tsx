import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ChakraWrapper({ children }: Props) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

