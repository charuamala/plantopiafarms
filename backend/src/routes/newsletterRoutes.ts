import { Router } from 'express';
import { getDb } from '../db/d1';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body ?? {};

    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email is required.' });
    }

    const db = getDb();
    const existing = await db
      .prepare('SELECT id FROM newsletter_subscribers WHERE email = ?')
      .bind(email)
      .first();

    if (existing) {
      return res.json({ success: true, alreadySubscribed: true });
    }

    await db
      .prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)')
      .bind(email)
      .run();

    res.json({ success: true, alreadySubscribed: false });
  } catch (err) {
    next(err);
  }
});

export default router;
