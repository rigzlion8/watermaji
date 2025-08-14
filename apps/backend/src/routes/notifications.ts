import { Router } from 'express';

const router = Router();

// GET /api/notifications
router.get('/', (req, res) => {
  res.json({ message: 'Get notifications - TODO: Implement' });
});

// POST /api/notifications/send
router.post('/send', (req, res) => {
  res.json({ message: 'Send notification - TODO: Implement' });
});

// PATCH /api/notifications/:id/read
router.patch('/:id/read', (req, res) => {
  res.json({ message: `Mark notification ${req.params.id} as read - TODO: Implement` });
});

export default router;
