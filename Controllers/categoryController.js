const { Category } = require("../models");

exports.Create = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const exists = await Category.findOne({ where: { name } });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category name already exists"
      });
    }

    const category = await Category.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.Index = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });

    if (categories.length === 0) {
      return res.json({
        success: true,
        message: "No categories found",
        data: []
      });
    }

    res.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.Show = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.json({
      success: true,
      message: "Category fetched successfully",
      data: category
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.Update = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    if (name) {
      const exists = await Category.findOne({
        where: { name, id: { $ne: category.id } }
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists"
        });
      }
    }

    await category.update({
      name: name ?? category.name,
      description: description ?? category.description
    });

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.Delete = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    await category.destroy();

    res.json({
      success: true,
      message: "Category deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
