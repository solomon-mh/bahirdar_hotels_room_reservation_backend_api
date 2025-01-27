import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Payments route');
});

export const paymentsRouter = router;
