const Category = require('../models/categoryModel');

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const categoryId = await Category.create(req.user.id, req.body);
      res.status(201).json({
        message: 'Category created successfully',
        categoryId
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll(req.user.id);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const success = await Category.update(req.params.id, req.user.id, req.body);
      if (!success) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ message: 'Category updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const success = await Category.delete(req.params.id, req.user.id);
      if (!success) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoryController;