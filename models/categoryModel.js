const pool = require('../config/database');

class Category {
  static async create(userId, { name }) {
    const [result] = await pool.execute(
      'INSERT INTO Categories (name, user_id) VALUES (?, ?)',
      [name, userId]
    );
    return result.insertId;
  }

  static async findAll(userId) {
    const [categories] = await pool.execute(
      'SELECT * FROM Categories WHERE user_id = ?',
      [userId]
    );
    return categories;
  }

  static async update(categoryId, userId, { name }) {
    const [result] = await pool.execute(
      'UPDATE Categories SET name = ? WHERE id = ? AND user_id = ?',
      [name, categoryId, userId]
    );
    return result.affectedRows > 0;
  }

  static async delete(categoryId, userId) {
    const [result] = await pool.execute(
      'DELETE FROM Categories WHERE id = ? AND user_id = ?',
      [categoryId, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Category;