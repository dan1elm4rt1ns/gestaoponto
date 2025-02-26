const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar e executar o script de migração e criação de usuário
const setup = require('./src/utils/setup');
setup();  // Chama a função que cria as tabelas e o usuário admin

// Importação das rotas
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const pontoRoutes = require('./src/routes/pontoRoutes');
const correcaoRoutes = require('./src/routes/correcaoRoutes');

// Definir rotas
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/ponto', pontoRoutes);
app.use('/correcao', correcaoRoutes);

app.get('/', (req, res) => {
  res.send('API Gestao Ponto rodando! 🚀');
});

// Definir porta e iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

