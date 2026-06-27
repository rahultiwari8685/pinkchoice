import Product from "../models/Product.js";

// ================= Create Product =================
export const createProduct = async (req, res) => {
  try {
    const { title, price, categories, content } = req.body;

    const thumbnail = req.files?.thumbnail
      ? req.files.thumbnail[0].filename
      : "";

    const gallery = [];

    if (req.files?.gallery1) {
      gallery[0] = req.files.gallery1[0].filename;
    }

    if (req.files?.gallery2) {
      gallery[1] = req.files.gallery2[0].filename;
    }

    if (req.files?.gallery3) {
      gallery[2] = req.files.gallery3[0].filename;
    }

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

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.title = title;
    product.price = price;
    product.categories = categories ? JSON.parse(categories) : [];
    product.content = content ? JSON.parse(content) : {};

    // Banner
    if (req.files?.thumbnail) {
      product.thumbnail = req.files.thumbnail[0].filename;
    }

    // Existing Gallery
    const gallery = [...product.gallery];

    if (req.files?.gallery1) {
      gallery[0] = req.files.gallery1[0].filename;
    }

    if (req.files?.gallery2) {
      gallery[1] = req.files.gallery2[0].filename;
    }

    if (req.files?.gallery3) {
      gallery[2] = req.files.gallery3[0].filename;
    }

    product.gallery = gallery;

    await product.save();

    return res.json({
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
