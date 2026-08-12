import { Router } from 'express';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ success: true, cart: { items: [] }, message: 'Cart endpoint ready' });
});

export default router;
