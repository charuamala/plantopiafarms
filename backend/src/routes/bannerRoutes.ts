import { Router } from 'express';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ success: true, banners: [], message: 'Banner list endpoint ready' });
});

export default router;
