import { Router } from 'express';
import { Users } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  try {
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  await user.destroy();
  res.status(204).send();
});

export default router;
