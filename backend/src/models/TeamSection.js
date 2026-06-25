import mongoose from "mongoose";

const teamSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "Join Our Team",
    },

    buttonLink: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("TeamSection", teamSectionSchema);
