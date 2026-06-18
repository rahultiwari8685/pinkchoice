import BusinessRegistration from "../models/BusinessRegistration.js";
import bcrypt from "bcryptjs";

export const registerBusiness = async (req, res) => {
  try {
    const {
      name,
      company_name,
      email,
      mobile,
      monthly_sales,
      yearly_turnover,
      experience_years,
      business_address,
      residential_address,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !business_address ||
      !residential_address ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const exists = await BusinessRegistration.findOne({
      $or: [{ email }, { mobile }],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email or Mobile already registered.",
      });
    }

    const business = await BusinessRegistration.create({
      name,
      company_name,
      email,
      mobile,
      monthly_sales,
      yearly_turnover,
      experience_years,
      business_address,
      residential_address,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully.",
      data: business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBusiness = async (req, res) => {
  try {
    const data = await BusinessRegistration.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBusiness = async (req, res) => {
  try {
    const data = await BusinessRegistration.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBusinessStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const data = await BusinessRegistration.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      },
    );

    res.json({
      success: true,
      message: "Status Updated Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    await BusinessRegistration.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
