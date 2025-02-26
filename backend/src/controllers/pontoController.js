const Ponto = require('../models/Ponto');

class PontoController {
  static async registerPonto(req, res) {
    try {
      const { type, timestamp } = req.body;
      const user_id = req.user.id;
      const ponto = await Ponto.create({ user_id, type, timestamp });
      res.json(ponto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  static async listPontos(req, res) {
    try {
      const user_id = req.user.id;
      const pontos = await Ponto.findByUser(user_id);
      res.json(pontos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}

module.exports = PontoController;
