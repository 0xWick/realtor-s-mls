import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" }); // Method Not Allowed
  }

  const { name, phone, email, password } = req.body;

  // Simple validation
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ error: 'Name, phone, email, and password are required' });
  }

  try {
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password,  // Note: Password is not hashed in this example
      },
    });

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    // Handles Prisma unique constraint violation
    if ((error as any).code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Generic error handling
    res.status(500).json({ error: 'Internal server error', details: (error as any).message });
  } finally {
    await prisma.$disconnect();
  }
}
