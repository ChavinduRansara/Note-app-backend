const pool = require('../config/database');

class Note {
  static async create(userId, { title, content, category_id, tags }) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    console.log(userId, title, content, category_id, tags);

    try {
      const [noteResult] = await connection.execute(
        'INSERT INTO Notes (user_id, title, content, category_id) VALUES (?, ?, ?, ?)',
        [userId, title, content, category_id]
      );
      const noteId = noteResult.insertId;

      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          await connection.execute(
            'INSERT IGNORE INTO Tags (name) VALUES (?)',
            [tagName]
          );
          
          const [tagResult] = await connection.execute(
            'SELECT id FROM Tags WHERE name = ?',
            [tagName]
          );
          
          await connection.execute(
            'INSERT INTO NoteTags (note_id, tag_id) VALUES (?, ?)',
            [noteId, tagResult[0].id]
          );
        }
      }

      await connection.commit();
      return noteId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findAll(userId) {
    // let query = `
    //   SELECT DISTINCT n.*, 
    //   c.name as category_name,
    //   GROUP_CONCAT(t.name) as tags
    //   FROM Notes n
    //   LEFT JOIN Categories c ON n.category_id = c.id
    //   LEFT JOIN NoteTags nt ON n.id = nt.note_id
    //   LEFT JOIN Tags t ON nt.tag_id = t.id
    //   WHERE n.user_id = ?
    // `;

    let query = `
      SELECT 
        Notes.*, 
      GROUP_CONCAT(Tags.name) AS tags
      FROM 
        Notes
      LEFT JOIN 
        NoteTags ON Notes.id = NoteTags.note_id
      LEFT JOIN 
        Tags ON NoteTags.tag_id = Tags.id
      GROUP BY 
        Notes.id;
    `;
    const queryParams = [userId];

    // if (category) {
    //   query += ' AND c.id = ?';
    //   queryParams.push(category);
    // }

    // if (tag) {
    //   query += ' AND t.name = ?';
    //   queryParams.push(tag);
    // }

    // if (search) {
    //   query += ' AND (n.title LIKE ? OR n.content LIKE ?)';
    //   queryParams.push(`%${search}%`, `%${search}%`);
    // }

    // query += ' GROUP BY n.id ORDER BY n.is_pinned DESC, n.created_at DESC';

    const [notes] = await pool.execute(query, queryParams);
    return notes;
  }

  static async findById(noteId, userId) {
    const [notes] = await pool.execute(
      `SELECT n.*, 
      c.name as category_name,
      GROUP_CONCAT(t.name) as tags
      FROM Notes n
      LEFT JOIN Categories c ON n.category_id = c.id
      LEFT JOIN NoteTags nt ON n.id = nt.note_id
      LEFT JOIN Tags t ON nt.tag_id = t.id
      WHERE n.id = ? AND n.user_id = ?
      GROUP BY n.id`,
      [noteId, userId]
    );
    return notes[0];
  }

  static async update(noteId, userId, { title, content, category_id, tags, is_pinned }) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const [noteCheck] = await connection.execute(
        'SELECT id FROM Notes WHERE id = ? AND user_id = ?',
        [noteId, userId]
      );

      if (noteCheck.length === 0) {
        return false;
      }

      await connection.execute(
        'UPDATE Notes SET title = ?, content = ?, category_id = ?, is_pinned = ? WHERE id = ?',
        [title, content, category_id, is_pinned, noteId]
      );

      if (tags) {
        await connection.execute(
          'DELETE FROM NoteTags WHERE note_id = ?',
          [noteId]
        );

        for (const tagName of tags) {
          await connection.execute(
            'INSERT IGNORE INTO Tags (name) VALUES (?)',
            [tagName]
          );

          const [tagResult] = await connection.execute(
            'SELECT id FROM Tags WHERE name = ?',
            [tagName]
          );

          await connection.execute(
            'INSERT INTO NoteTags (note_id, tag_id) VALUES (?, ?)',
            [noteId, tagResult[0].id]
          );
        }
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(noteId, userId) {
    const [result] = await pool.execute(
      'DELETE FROM Notes WHERE id = ? AND user_id = ?',
      [noteId, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Note;