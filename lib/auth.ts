import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
  };
}
