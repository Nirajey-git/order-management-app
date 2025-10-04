// backend/src/controllers/userController.js
import prisma from "../prisma.js";

// Create user
export async function createUser(req, res) {
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// List users
export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
