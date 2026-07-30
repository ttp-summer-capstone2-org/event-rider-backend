import { Router } from "express";
import { Tickets } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const tickets = await Tickets.findAll();
  res.json(tickets);
});

router.get("/:id", async (req, res) => {
  const ticket = await Tickets.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
});

router.post("/", async (req, res) => {
  try {
    const ticket = await Tickets.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const ticket = await Tickets.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  try {
    await ticket.update(req.body);
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const ticket = await Tickets.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  await ticket.destroy();
  res.status(204).send();
});

export default router;
