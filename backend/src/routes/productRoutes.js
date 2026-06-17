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

router.post(
  "/saveProduct",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 3,
    },
  ]),
  createProduct,
);

router.get("/getAllProducts", getProducts);

router.get("/:id", getProduct);

router.put(
  "/update/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 3,
    },
  ]),
  updateProduct,
);

// Delete Product
router.delete("/delete/:id", deleteProduct);

export default router;
