import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const property = await prisma.property.findUnique({
        where: { id: String(id) },
      });

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      if (property.userId !== user.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      return res.status(200).json(property);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { price, rooms, areaInSqFt, location, ownerDetails } = req.body;

    try {
      const property = await prisma.property.findUnique({
        where: { id: String(id) },
      });

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      if (property.userId !== user.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const updatedProperty = await prisma.property.update({
        where: { id: String(id) },
        data: {
          price,
          rooms,
          areaInSqFt,
          location,
          ownerDetails,
        },
      });
      return res.status(200).json(updatedProperty);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const property = await prisma.property.findUnique({
        where: { id: String(id) },
      });

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      if (property.userId !== user.userId) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await prisma.property.delete({
        where: { id: String(id) },
      });
      return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

export default verifyToken(handler);
