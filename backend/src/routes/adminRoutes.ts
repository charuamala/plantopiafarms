import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin';
import {
  countActiveProducts,
  createProduct,
  deleteProduct,
  listAllProductsForAdmin,
  updateProduct,
} from '../db/products';
import { signToken } from '../utils/auth';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body ?? {};
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@plantopia.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Plantopia123';

  if (email !== adminEmail || password !== adminPassword) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  const token = signToken({ email, role: 'admin' });
  res.json({ success: true, token });
});

router.get('/dashboard', requireAdmin, async (_req, res, next) => {
  try {
    const totalProducts = await countActiveProducts();
    res.json({
      success: true,
      stats: {
        totalSales: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/products', requireAdmin, async (_req, res, next) => {
  try {
    const products = await listAllProductsForAdmin();
    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
});

router.post('/products', requireAdmin, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

router.put('/products/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await updateProduct(id, req.body);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

router.delete('/products/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteProduct(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
