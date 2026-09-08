import { Router } from 'express';
import { getDb } from '../db/d1';

const router = Router();

const VALID_TYPES = new Set(['grower', 'business', 'investor', 'general']);

router.post('/', async (req, res, next) => {
  try {
    const { type, name, email, phone, company, message } = req.body ?? {};

    if (!VALID_TYPES.has(type)) {
      return res.status(400).json({ success: false, message: 'Invalid enquiry type.' });
    }
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    const db = getDb();
    await db
      .prepare(
        'INSERT INTO enquiries (type, name, email, phone, company, message) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .bind(type, name, email, phone ?? null, company ?? null, message ?? null)
      .run();

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
