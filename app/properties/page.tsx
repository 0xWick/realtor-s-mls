'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  SimpleGrid,
  Container,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import PropertyCard from '../../components/PropertyCard';
import Navbar from '../../components/Navbar'; // Import the Navbar component

type Property = {
  id: string;
  price: number;
  rooms: number;
  areaInSqFt: number;
  location: string;
  ownerDetails: string;
  userId: string;
};

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/properties', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Navbar /> {/* Include the Navbar component here */}
      
      {/* Page Header */}
      <Box textAlign="center" my={8}>
        <Heading as="h1" size="2xl">
          Browse Available Properties
        </Heading>
        <Text fontSize="lg" mt={2}>
          Find your next home from our extensive property listings.
        </Text>
      </Box>

      {/* Search Box */}
      <Box bg="white" py={4} boxShadow="md">
        <Container maxW="lg">
          <Input
            placeholder="Search properties by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Container>
      </Box>

      {/* Property Cards */}
      <Container maxW="6xl" mt={10}>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" />
          </Flex>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
