import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price), stock: parseInt(stock) },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
