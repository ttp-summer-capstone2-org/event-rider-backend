import { Router } from "express";
import { Drivers } from "../models/index.js";
const router = Router();
router.get("/", async (req, res) => {
  const drivers = await Drivers.findAll();
  res.json(drivers);
});
router.get("/:id", async (req, res) => {
  const driver = await Drivers.findByPk(req.params.id);
  if (!driver) return res.status(404).json({ error: "Driver not found" });
  res.json(driver);
});
router.post("/", async (req, res) => {
  try {
    const driver = await Drivers.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  const driver = await Drivers.findByPk(req.params.id);
  if (!driver) return res.status(400).json({ error: "Driver not found" });
  try {
    await driver.update(req.body);
    res.json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  const driver = await Drivers.findByPk(req.params.id);
  if (!driver) return res.status(404).json({ error: "Driver not found" });
  await driver.destroy();
  res.status(204).send();
});
export default router;
