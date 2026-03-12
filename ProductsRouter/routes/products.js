const express = require("express");
const router = express.Router();
let products = require("../data/products");

// GET all products with optional query filtering & sorting
router.get("/", (req, res) => {
  let result = [...products];

  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  if (req.query.sort === "price") {
    result.sort((a, b) => a.price - b.price);
  }

  res.json(result);
});

// GET single product by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST create new product
router.post("/", (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price)
    return res.status(400).json({ message: "All fields are required" });

  const newProduct = { id: products.length + 1, name, category, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT full update product
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const { name, category, price } = req.body;
  if (!name || !category || !price)
    return res.status(400).json({ message: "All fields are required" });

  products[index] = { id, name, category, price };
  res.json(products[index]);
});

// DELETE product
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const removed = products.splice(index, 1);
  res.json({ message: "Product deleted", product: removed[0] });
});



module.exports = router;