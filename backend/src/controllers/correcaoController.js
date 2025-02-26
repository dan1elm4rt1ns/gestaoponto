const pool = require('../utils/db');

class CorrecaoController {
  static async corrigirPontos(req, res) {
    try {
      const { userIds, startDate, endDate, padrao } = req.body;
      await pool.query(
        'DELETE FROM pontos WHERE user_id = ANY($1) AND timestamp::date BETWEEN $2 AND $3',
        [userIds, startDate, endDate]
      );
      for (const userId of userIds) {
        await pool.query(
          'INSERT INTO pontos (user_id, type, timestamp) VALUES ($1, $2, $3)',
          [userId, 'entrada', new Date(`${startDate}T${padrao.entrada}:00`)]
        );
      }
      res.json({ message: 'Pontos corrigidos com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}

module.exports = CorrecaoController;
