import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Request type to include the user property
interface AuthRequest extends Request {
  user?: { id: string };
}

// Define the middleware with proper types
const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return; // Explicitly return to prevent further execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };
    next(); // Call next() to pass control to the next handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    return; // Explicitly return to prevent further execution
  }
};

export default auth;