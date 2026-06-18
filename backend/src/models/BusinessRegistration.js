import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const businessRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company_name: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    monthly_sales: {
      type: Number,
      default: 0,
    },

    yearly_turnover: {
      type: Number,
      default: 0,
    },

    experience_years: {
      type: Number,
      default: 0,
    },

    business_address: {
      type: String,
      required: true,
    },

    residential_address: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

businessRegistrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model(
  "BusinessRegistration",
  businessRegistrationSchema,
);
