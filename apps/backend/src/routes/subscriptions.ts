import { Router } from 'express';

const router = Router();

// GET /api/subscriptions
router.get('/', (req, res) => {
  res.json({ message: 'Get subscriptions - TODO: Implement' });
});

// POST /api/subscriptions
router.post('/', (req, res) => {
  res.json({ message: 'Create subscription - TODO: Implement' });
});

// GET /api/subscriptions/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get subscription ${req.params.id} - TODO: Implement` });
});

// PATCH /api/subscriptions/:id
router.patch('/:id', (req, res) => {
  res.json({ message: `Update subscription ${req.params.id} - TODO: Implement` });
});

export default router;
