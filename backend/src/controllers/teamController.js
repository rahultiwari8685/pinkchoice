import fs from "fs";
import path from "path";
import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  try {
    const {
      name,
      designation,
      bio,
      email,
      phone,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      website,
      sortOrder,
      status,
    } = req.body;

    const team = new Team({
      name,
      designation,
      bio,
      email,
      phone,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      website,
      sortOrder: sortOrder || 0,
      status: status === "false" ? false : true,
      image: req.file ? req.file.filename : "",
    });

    await team.save();

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: team,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTeam = async (req, res) => {
  try {
    const team = await Team.find().sort({
      sortOrder: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getActiveTeam = async (req, res) => {
  try {
    const team = await Team.find({
      status: true,
    }).sort({
      sortOrder: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    if (req.file) {
      if (team.image) {
        const oldPath = path.join("uploads/team", team.image);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      team.image = req.file.filename;
    }

    team.name = req.body.name;
    team.designation = req.body.designation;
    team.bio = req.body.bio;
    team.email = req.body.email;
    team.phone = req.body.phone;
    team.facebook = req.body.facebook;
    team.instagram = req.body.instagram;
    team.twitter = req.body.twitter;
    team.linkedin = req.body.linkedin;
    team.youtube = req.body.youtube;
    team.website = req.body.website;
    team.sortOrder = req.body.sortOrder;
    team.status = req.body.status === "false" ? false : true;

    await team.save();

    res.json({
      success: true,
      message: "Team updated successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    if (team.image) {
      const img = path.join("uploads/team", team.image);

      if (fs.existsSync(img)) {
        fs.unlinkSync(img);
      }
    }

    await Team.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    team.status = !team.status;

    await team.save();

    res.json({
      success: true,
      message: "Status updated",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
