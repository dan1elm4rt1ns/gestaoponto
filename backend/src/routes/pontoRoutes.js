const express = require('express');
const router = express.Router();
const PontoController = require('../controllers/pontoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, PontoController.registerPonto);
router.get('/', authMiddleware, PontoController.listPontos);

module.exports = router;
