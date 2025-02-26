const express = require('express');
const router = express.Router();
const CorrecaoController = require('../controllers/correcaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/', authMiddleware, CorrecaoController.corrigirPontos);

module.exports = router;
