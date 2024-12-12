const pool = require('../config/database');

class Tag {
  static async findAll(userId) {
    const [tags] = await pool.execute(`
      SELECT t.* FROM Tags t`
    );
    return tags;
  }

  static async deleteUnused() {
    const [result] = await pool.execute(`
      DELETE t FROM Tags t 
      LEFT JOIN NoteTags nt ON t.id = nt.tag_id 
      WHERE nt.tag_id IS NULL`
    );
    return result.affectedRows;
  }
}

module.exports = Tag;