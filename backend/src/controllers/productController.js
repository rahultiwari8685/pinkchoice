import Product from "../models/Product.js";

// ================= Create Product =================
export const createProduct = async (req, res) => {
  try {
    const { title, price, discount, categories, content } = req.body;

    const productPrice = parseFloat(price) || 0;
    const productDiscount = parseFloat(discount) || 0;

    // Calculate Final Price
    const finalPrice = productPrice - (productPrice * productDiscount) / 100;

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
      price: productPrice,
      discount: productDiscount,
      final_price: Number(finalPrice.toFixed(2)),
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
    const { title, price, discount, final_price, categories, content } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update Basic Details
    product.title = title;
    const productPrice = parseFloat(price) || 0;
    const productDiscount = parseFloat(discount) || 0;

    // Calculate Final Price
    const finalPrice = productPrice - (productPrice * productDiscount) / 100;

    product.price = productPrice;
    product.discount = productDiscount;
    product.final_price = Number(finalPrice.toFixed(2));
    product.categories = categories ? JSON.parse(categories) : [];
    product.content = content ? JSON.parse(content) : {};

    // Update Banner
    if (req.files?.thumbnail) {
      product.thumbnail = req.files.thumbnail[0].filename;
    }

    // Update Gallery Images
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

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
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
