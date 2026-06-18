import express from "express";
import {
  saveContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/save", saveContact);

router.get("/list", getContacts);

router.delete("/:id", deleteContact);

export default router;
