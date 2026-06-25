import express from "express";

import {
  getTeamSection,
  updateTeamSection,
} from "../controllers/teamSectionController.js";

const router = express.Router();

router.get("/", getTeamSection);

router.put("/", updateTeamSection);

export default router;
