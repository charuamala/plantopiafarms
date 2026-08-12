import { Router } from 'express';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ success: true, orders: [], message: 'Order list endpoint ready' });
});

router.post('/', async (_req, res) => {
  res.json({ success: true, message: 'Create order endpoint ready' });
});

export default router;
