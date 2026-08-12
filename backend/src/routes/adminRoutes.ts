import { Router } from 'express';

const router = Router();

router.get('/dashboard', async (_req, res) => {
  res.json({
    success: true,
    stats: {
      totalSales: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0,
    },
    message: 'Admin dashboard endpoint ready',
  });
});

export default router;
