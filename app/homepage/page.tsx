// app/homepage/page.tsx
'use client';

import Navbar from '../../components/Navbar';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Select,
  Button,
  VStack,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Box
      position="relative"
      bgImage="url('/house.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      h="100vh"
      color="white"
    >
      <Box bg="rgba(0, 0, 0, 0.6)" h="100%" w="100%" position="absolute" top="0" left="0" />
      
      <Navbar />

      <Container maxW="container.xl" py="12" position="relative" zIndex="1">
        <Box textAlign="center" mb="10">
          <Heading as="h1" size="2xl">
            Find Your Dream Home
          </Heading>
          <Text fontSize="xl" mt="4">
            We understand the fact that modern people strive for maximum comfort.
          </Text>
        </Box>

        <VStack spacing="4" mb="12">
          <Box
            bg="white"
            p="6"
            rounded="md"
            boxShadow="lg"
            w="full"
            maxW="4xl"
            mx="auto"
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" w="full">
              <Input 
                placeholder="Enter your location" 
                color="black"  // Make the placeholder and text black
              />
              <Select placeholder="Property type" color="black">  // Make the options text black
                <option value="house">House</option>
                <option value="flats">Flats</option>
                <option value="plots">Plots</option>
                <option value="commercial">Commercial</option>
              </Select>
              <Input 
                placeholder="Max price" 
                defaultValue="$3,000" 
                color="black"  // Make the placeholder and text black
              />
            </SimpleGrid>
            <Button colorScheme="blue" size="lg" w="full" mt="4">
              Search
            </Button>
          </Box>
        </VStack>

        <SimpleGrid columns={{ base: 2, md: 4 }} spacing="10" textAlign="center">
          <Box>
            <Text fontSize="4xl" fontWeight="bold">
              128K
            </Text>
            <Text fontSize="lg">Renters</Text>
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold">
              300+
            </Text>
            <Text fontSize="lg">Specialists</Text>
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold">
              78%
            </Text>
            <Text fontSize="lg">Yearly Growth</Text>
          </Box>
          <Box>
            <Text fontSize="4xl" fontWeight="bold">
              10K+
            </Text>
            <Text fontSize="lg">Properties</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
