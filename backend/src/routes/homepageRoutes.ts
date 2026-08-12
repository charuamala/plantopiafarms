import { Router } from 'express';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ success: true, homepage: { sections: [] }, message: 'Homepage endpoint ready' });
});

export default router;
