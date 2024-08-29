"use client";

import { useState, useEffect } from 'react';
import { Box, SimpleGrid, Container, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import PropertyCard from '../../components/PropertyCard';

type Property = {
  id: string;
  price: number;
  rooms: number;
  areaInSqFt: number;
  location: string;
  ownerDetails: string;
  userId: string;
};

export default function MyPropertiesPage() {
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

  return (
    <Box>

      {/* Property Cards */}
      <Container maxW="6xl" mt={6}>
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
