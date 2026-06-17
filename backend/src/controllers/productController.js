import Product from "../models/Product.js";

// ================= Create Product =================
export const createProduct = async (req, res) => {
  try {
    const { title, price, categories, content } = req.body;

    const thumbnail = req.files?.thumbnail
      ? req.files.thumbnail[0].filename
      : "";

    const gallery = req.files?.gallery
      ? req.files.gallery.map((file) => file.filename)
      : [];

    const product = await Product.create({
      title,
      price,
      categories: categories ? JSON.parse(categories) : [],
      content: content ? JSON.parse(content) : {},
      thumbnail,
      gallery,
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= Get All Products =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categories", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= Get Single Product =================
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(
      "categories",
      "name slug",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= Update Product =================
export const updateProduct = async (req, res) => {
  try {
    const { title, price, categories, content } = req.body;

    const updateData = {
      title,
      price,
      categories: categories ? JSON.parse(categories) : [],
      content: content ? JSON.parse(content) : {},
    };

    // Update Banner Image
    if (req.files?.thumbnail) {
      updateData.thumbnail = req.files.thumbnail[0].filename;
    }

    // Update Gallery Images
    if (req.files?.gallery) {
      updateData.gallery = req.files.gallery.map((file) => file.filename);
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= Delete Product =================
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
