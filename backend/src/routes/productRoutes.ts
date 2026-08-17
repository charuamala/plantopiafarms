import { Router } from 'express';
import { getProductBySlug, listProducts } from '../db/products';

const router = Router();

function toNumber(value: unknown): number | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

router.get('/', async (req, res, next) => {
  try {
    const q = req.query;
    const result = await listProducts({
      category: typeof q.category === 'string' ? q.category : undefined,
      minPrice: toNumber(q.minPrice),
      maxPrice: toNumber(q.maxPrice),
      weight: typeof q.weight === 'string' ? q.weight : undefined,
      inStock: q.inStock === 'true',
      type: typeof q.type === 'string' ? q.type : undefined,
      minDiscount: toNumber(q.minDiscount),
      search: typeof q.search === 'string' ? q.search : undefined,
      sort: typeof q.sort === 'string' ? q.sort : undefined,
      page: toNumber(q.page),
      limit: toNumber(q.limit),
    });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

export default router;
