const pool = require('../utils/db');

class DashboardController {
  static async getDashboard(req, res) {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM pontos WHERE DATE(timestamp) = CURRENT_DATE');
      res.json({ totalPontosHoje: result.rows[0].count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}

module.exports = DashboardController;
