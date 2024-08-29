// app/login/page.tsx
'use client';

import { Box, Button, Input, Flex, Text, Heading, VStack, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      router.push('/homepage');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.50">
      <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        textAlign="center"
      >
        <Image src="/logo.png" alt="Company Logo" mb={8} mx="auto" />
        <Heading as="h2" size="lg" mb={6}>
          Welcome Back!
        </Heading>
        <Text fontSize="md" mb={4} color="gray.600">
          Please log in to your account
        </Text>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <VStack spacing={4}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
          <Button colorScheme="blue" width="full" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
        <Text mt={4} color="gray.600" fontSize="sm">
          Don't have an account? <Button variant="link" colorScheme="blue">Sign Up</Button>
        </Text>
      </Box>
    </Flex>
  );
}
