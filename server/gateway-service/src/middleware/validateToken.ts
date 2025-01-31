import { IUser } from './../../../user-service/src/types/IUser';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Augment the Express Request interface to add the `user` property
// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser; // Add the user property to the Request interface
//     }
//   }
// }

export const validateAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization header missing or malformed' });
    return
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Check if decoded is JwtPayload and cast it to IUser
    if (decoded && typeof decoded === 'object') {
      req.user = decoded as IUser;  // Now TypeScript will allow this
    } else {
      return res.status(403).json({ error: 'Invalid token structure' });
    }

    next();
  });
};
