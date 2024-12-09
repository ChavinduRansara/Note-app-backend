const Note = require("../models/noteModel");

const noteController = {
  createNote: async (req, res) => {
    try {
      const noteId = await Note.create(req.user.id, req.body);
      res.status(201).json({
        message: "Note created successfully",
        noteId,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNotes: async (req, res) => {
    try {
      const notes = await Note.findAll(req.user.id);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNote: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id, req.user.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const success = await Note.update(req.params.id, req.user.id, req.body);
      if (!success) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      const success = await Note.delete(req.params.id, req.user.id);
      if (!success) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = noteController;
