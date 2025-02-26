const pool = require('../utils/db');

class Ponto {
  static async create({ user_id, type, timestamp }) {
    const result = await pool.query(
      'INSERT INTO pontos (user_id, type, timestamp) VALUES ($1, $2, $3) RETURNING *',
      [user_id, type, timestamp]
    );
    return result.rows[0];
  }

  static async findByUser(user_id) {
    const result = await pool.query('SELECT * FROM pontos WHERE user_id = $1 ORDER BY timestamp ASC', [user_id]);
    return result.rows;
  }
}

module.exports = Ponto;
