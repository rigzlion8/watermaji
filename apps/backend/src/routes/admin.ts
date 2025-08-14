import { Router } from 'express';

const router = Router();

// GET /api/admin/metrics
router.get('/metrics', (req, res) => {
  res.json({ message: 'Get admin metrics - TODO: Implement' });
});

// POST /api/admin/products
router.post('/products', (req, res) => {
  res.json({ message: 'Create product - TODO: Implement' });
});

// PATCH /api/admin/subscriptions/:id
router.patch('/subscriptions/:id', (req, res) => {
  res.json({ message: `Update subscription ${req.params.id} - TODO: Implement` });
});

export default router;
