import { Router } from "express";
import { Rides } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const rides = await Rides.findAll();
  res.json(rides);
});

router.get("/:id", async (req, res) => {
  const ride = await Rides.findByPk(req.params.id);
  if (!ride) return res.status(404).json({ error: "Ride not found" });
  res.json(ride);
});

router.post("/", async (req, res) => {
  try {
    const ride = await Rides.create(req.body);
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const ride = await Rides.findByPk(req.params.id);
  if (!ride) return res.status(404).json({ error: "Ride not found" });
  try {
    await ride.update(req.body);
    res.json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const ride = await Rides.findByPk(req.params.id);
  if (!ride) return res.status(404).json({ error: "Ride not found" });
  await ride.destroy();
  res.status(204).send();
});

export default router;
