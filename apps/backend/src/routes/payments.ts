import { Router } from 'express';

const router = Router();

// POST /api/payments/create-intent
router.post('/create-intent', (req, res) => {
  res.json({ message: 'Create payment intent - TODO: Implement' });
});

// POST /api/payments/confirm
router.post('/confirm', (req, res) => {
  res.json({ message: 'Confirm payment - TODO: Implement' });
});

// POST /api/payments/webhook
router.post('/webhook', (req, res) => {
  res.json({ message: 'Payment webhook - TODO: Implement' });
});

export default router;
