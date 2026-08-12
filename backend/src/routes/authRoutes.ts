import { Router } from 'express';

const router = Router();

router.post('/register', async (_req, res) => {
  res.json({ message: 'Register endpoint ready' });
});

router.post('/login', async (_req, res) => {
  res.json({ message: 'Login endpoint ready' });
});

export default router;
