import { Router } from 'express';
import { listCategories } from '../db/products';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const categories = await listCategories();
    res.json({ success: true, categories });
  } catch (err) {
    next(err);
  }
});

export default router;
