'use client';

import { Box, Flex, HStack, Link, Button, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Flex as="header" bg="white" px="6" py="4" align="center" boxShadow="md" zIndex="1000" position="relative">
      <Image 
        src="/white.png" 
        alt="Realtor's MLS Logo" 
        boxSize="70px"
        objectFit="contain"
        zIndex="1"  // Ensure image is on top
      />
      <HStack as="nav" spacing="6" ml="auto" display={{ base: "none", md: "flex" }} zIndex="1">
        <Link href="/homepage" fontWeight="medium" color="black" _hover={{ textDecoration: 'none' }}>Home</Link>
        <Link href="/properties" fontWeight="medium" color="black" _hover={{ textDecoration: 'none' }}>All Properties</Link>
        <Link href="/my-properties" fontWeight="medium" color="black" _hover={{ textDecoration: 'none' }}>My Properties</Link>
        <Link href="/realtors" fontWeight="medium" color="black" _hover={{ textDecoration: 'none' }}>Realtor Book</Link>
        <Link href="/about" fontWeight="medium" color="black" _hover={{ textDecoration: 'none' }}>About Us</Link>
      </HStack>
      <Button variant="outline" colorScheme="blackAlpha" ml="4" onClick={handleLogout} zIndex="1">
        Logout
      </Button>
    </Flex>
  );
}
