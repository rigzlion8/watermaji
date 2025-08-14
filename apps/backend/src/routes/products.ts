import { Router } from 'express';

const router = Router();

// GET /api/products
router.get('/', (req, res) => {
  res.json({ message: 'Get products - TODO: Implement' });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get product ${req.params.id} - TODO: Implement` });
});

export default router;
