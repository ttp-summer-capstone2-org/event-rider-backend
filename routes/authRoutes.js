import { Router } from "express";
import { Users } from "../models/index.js";

const router = Router();

function toPublicUser(user) {
  const { id, name, dob, email } = user;
  return { id, name, dob, email };
}

router.post("/signup", async (req, res) => {
  const { name, dob, email, password } = req.body;
  try {
    const user = await Users.create({ name, dob, email, password_hash: password });
    res.status(201).json(toPublicUser(user));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  const user = await Users.findOne({ where: { email: identifier } });
  if (!user || user.password_hash !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json(toPublicUser(user));
});

export default router;
