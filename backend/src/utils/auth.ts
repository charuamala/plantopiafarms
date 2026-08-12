import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'development-refresh-secret';

export const signToken = (payload: Record<string, unknown>) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const signRefreshToken = (payload: Record<string, unknown>) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export const verifyRefreshToken = (token: string) => jwt.verify(token, JWT_REFRESH_SECRET);
