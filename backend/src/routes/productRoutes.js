import express from "express";
import upload from "../middlewares/upload.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post(
  "/saveProduct",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery1",
      maxCount: 1,
    },
    {
      name: "gallery2",
      maxCount: 1,
    },
    {
      name: "gallery3",
      maxCount: 1,
    },
  ]),
  createProduct,
);

// Get All Products
router.get("/getAllProducts", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Update Product
router.put(
  "/update/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery1",
      maxCount: 1,
    },
    {
      name: "gallery2",
      maxCount: 1,
    },
    {
      name: "gallery3",
      maxCount: 1,
    },
  ]),
  updateProduct,
);

// Delete Product
router.delete("/delete/:id", deleteProduct);

export default router;
