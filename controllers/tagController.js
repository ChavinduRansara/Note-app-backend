const Tag = require('../models/tagModel');

const tagController = {
  getTags: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUnusedTags: async (req, res) => {
    try {
      const deletedCount = await Tag.deleteUnused();
      res.json({ 
        message: 'Unused tags deleted successfully',
        deletedCount
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = tagController;