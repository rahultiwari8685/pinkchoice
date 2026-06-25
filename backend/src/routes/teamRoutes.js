import express from "express";

import upload from "../middlewares/upload.js";

import {
  createTeam,
  getAllTeam,
  getActiveTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
  changeStatus,
} from "../controllers/teamController.js";

const router = express.Router();

router.post("/", upload.single("image"), createTeam);

router.get("/", getAllTeam);

router.get("/active", getActiveTeam);

router.get("/:id", getTeamById);

router.put("/:id", upload.single("image"), updateTeam);

router.delete("/:id", deleteTeam);

router.patch("/status/:id", changeStatus);

export default router;
