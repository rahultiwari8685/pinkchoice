import express from "express";

import uploadTeam from "../middleware/uploadTeam.js";

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

router.post("/", uploadTeam.single("image"), createTeam);

router.get("/", getAllTeam);

router.get("/active", getActiveTeam);

router.get("/:id", getTeamById);

router.put("/:id", uploadTeam.single("image"), updateTeam);

router.delete("/:id", deleteTeam);

router.patch("/status/:id", changeStatus);

export default router;
