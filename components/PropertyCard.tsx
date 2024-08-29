import { Box, Text, Button, Image } from '@chakra-ui/react';

type PropertyCardProps = {
  property: {
    id: string;
    price: number;
    rooms: number;
    areaInSqFt: number;
    location: string;
    ownerDetails: string;
  };
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
      <Image src={`/property-images/${property.id}.jpg`} alt={property.location} objectFit="cover" />
      <Box p="6">
        <Text fontWeight="bold" fontSize="xl">
          ${property.price.toLocaleString()}
        </Text>
        <Text mt="2">Location: {property.location}</Text>
        <Text mt="2">Rooms: {property.rooms}</Text>
        <Text mt="2">Area: {property.areaInSqFt} sq. ft.</Text>
        <Button mt="4" colorScheme="blue">
          View Details
        </Button>
      </Box>
    </Box>
  );
}
