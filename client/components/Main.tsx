import React from 'react';
import { Center } from '@chakra-ui/react';

// components
import { Info } from 'components/Info';

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <Center
      as='main'
      height='100vh'
      flexDirection='column'
      bgGradient='linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)'
    >
      {children}
      <Info />
    </Center>
  );
}
