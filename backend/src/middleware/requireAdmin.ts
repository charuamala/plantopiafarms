import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth';

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ success: false, message: 'Missing admin token' });
    return;
  }

  try {
    const payload = verifyToken(token);
    if (typeof payload === 'object' && payload.role === 'admin') {
      next();
      return;
    }
    res.status(403).json({ success: false, message: 'Not authorized' });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
