import { Router } from 'express';
import { Events } from '../models/index.js';

const router = Router();


router.get('/', async (req, res) => {
  const events = await Events.findAll();
  res.json(events);
})

router.get('/:id', async (req, res) => {
  const event = await Events.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });

  res.json(event);
}
);

router.post('/', async (req, res) => {
  try {
    const event = await Events.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const event = await Events.findByPk(req.params.id);
  if (!event)
    { return res.status(404).json({ error: 'Event not found' }); }
  try {
    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const event = await Events.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  await event.destroy();
  res.status(204).send();
});


export default router;
