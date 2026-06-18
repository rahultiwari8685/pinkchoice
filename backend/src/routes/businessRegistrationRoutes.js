import express from "express";

import {
  registerBusiness,
  getAllBusiness,
  getBusiness,
  updateBusinessStatus,
  deleteBusiness,
} from "../controllers/businessRegistrationController.js";

const router = express.Router();

router.post("/register", registerBusiness);

router.get("/list", getAllBusiness);

router.get("/:id", getBusiness);

router.put("/status/:id", updateBusinessStatus);

router.delete("/:id", deleteBusiness);

export default router;
