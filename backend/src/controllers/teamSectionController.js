import TeamSection from "../models/TeamSection.js";

export const getTeamSection = async (req, res) => {
  try {
    let section = await TeamSection.findOne();

    if (!section) {
      section = await TeamSection.create({
        heading:
          "Meet our team of creators, designers, and world-class problem solvers",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
        buttonText: "Join Our Team",
        buttonLink: "#",
      });
    }

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTeamSection = async (req, res) => {
  try {
    let section = await TeamSection.findOne();

    if (!section) {
      section = new TeamSection();
    }

    section.heading = req.body.heading;
    section.description = req.body.description;
    section.buttonText = req.body.buttonText;
    section.buttonLink = req.body.buttonLink;

    await section.save();

    res.status(200).json({
      success: true,
      message: "Team section updated successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
