import { Router } from 'express';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({
    success: true,
    products: [],
    message: 'Product list endpoint ready',
  });
});

router.get('/:id', async (req, res) => {
  res.json({ success: true, product: null, id: req.params.id, message: 'Product detail endpoint ready' });
});

export default router;
