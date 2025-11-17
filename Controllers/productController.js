const { Product, Category } = require("../models");

exports.Create = async (req, res) => {
  try {
    const { name, price, categoryId, inStock } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "name, price and categoryId are required"
      });
    }

    const categoryExists = await Category.findByPk(categoryId);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId (Category not found)"
      });
    }

    const product = await Product.create({
      name,
      price,
      categoryId,
      inStock: inStock ?? true
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.Index = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category" }]
    });

    if (products.length === 0) {
      return res.json({
        success: true,
        message: "No products found",
        data: []
      });
    }

    res.json({
      success: true,
      message: "Products fetched successfully",
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.Show = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product fetched successfully",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.Update = async (req, res) => {
  try {
    const { name, price, categoryId, inStock } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (categoryId) {
      const categoryExists = await Category.findByPk(categoryId);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid categoryId (Category not found)"
        });
      }
    }

    await product.update({
      name: name ?? product.name,
      price: price ?? product.price,
      categoryId: categoryId ?? product.categoryId,
      inStock: inStock ?? product.inStock
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.Delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
