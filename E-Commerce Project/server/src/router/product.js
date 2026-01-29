const express = require("express");
const { User } = require("../model/auth");
const bcrypt = require("bcrypt");
const { AuthMiddleware } = require("../middleware/auth");
const { Product } = require("../model/products");
const productRouter = express.Router();

// Public Routes
productRouter.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send({ message: "Product data fetched successfully", products });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

productRouter.get("/getProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    res.send({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

// Protected Routes
productRouter.post("/addProduct", AuthMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const { name, description, price, category, imageUrl, inStock } = req.body;

    // Explicitly validate required fields if not handled by Schema validation strictly enough
    if (!name || !description || !price || !category) {
      throw new Error("All fields are required");
    }

    const product = await Product({
      name,
      description,
      price,
      category,
      imageUrl,
      inStock,
      userId: user._id,
    });

    await product.save();
    res.send({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

productRouter.get("/myProducts", AuthMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const products = await Product.find({ userId: user._id });

    res.send({ message: "User products fetched successfully", products });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

productRouter.delete("/deleteProduct/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    // Allow if Admin OR if Owner
    if (
      loggedInUser.email !== "owais@gmail.com" &&
      product.userId.toString() !== loggedInUser._id.toString()
    ) {
      throw new Error("Unauthorized: You can only delete your own products.");
    }

    await Product.findByIdAndDelete(id);

    res.send({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

productRouter.patch("/updateProduct/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const loggedInUser = req.user;

    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    // Allow if Admin OR if Owner
    if (
      loggedInUser.role !== "admin" &&
      product.userId.toString() !== loggedInUser._id.toString()
    ) {
      throw new Error("Unauthorized: You can only update your own products.");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

module.exports = {
  productRouter,
};
