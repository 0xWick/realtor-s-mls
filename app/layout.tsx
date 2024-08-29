// app/layout.tsx
'use client';

import { ReactNode } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Realtor's MLS</title>
        <meta name="description" content="Find your dream home with ease." />
      </head>
      <body>
        <ChakraProvider>
          <Box>
            {children}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
