import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (req.method === 'GET') {
    // Check if the URL is explicitly for fetching all properties
    if (req.url === '/api/properties/all') {
      try {
        const properties = await prisma.property.findMany();
        return res.status(200).json(properties);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Default behavior: fetch properties for the authenticated user only
      try {
        const properties = await prisma.property.findMany({ where: { userId: user.userId } });
        return res.status(200).json(properties);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  } else if (req.method === 'POST') {
    const { price, rooms, areaInSqFt, location, ownerDetails } = req.body;

    try {
      const property = await prisma.property.create({
        data: {
          price,
          rooms,
          areaInSqFt,
          location,
          ownerDetails,
          userId: user.userId,
        },
      });
      return res.status(201).json(property);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default verifyToken(handler);
