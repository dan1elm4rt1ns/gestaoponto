const pool = require('./db');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Assumindo que você tem um modelo User
const dotenv = require('dotenv');

dotenv.config();  // Carregar variáveis de ambiente do .env

// Função para criar as tabelas caso não existam
async function createTables() {
  try {
    // Tabela de usuários
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de pontos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pontos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        type VARCHAR(50) NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tabelas verificadas/criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}

// Função para criar um usuário administrador caso não exista
async function createAdminUserIfNotExists() {
  try {
    const email = "admin@example.com"; // Email do admin
    const password = "adm1npwd"; // Senha do admin
    const existingUser = await User.findByEmail(email);  // Verificando se o admin já existe

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);  // Criptografando a senha
      const newUser = await User.create({
        name: "Admin",
        email,
        password: hashedPassword
      });

      console.log("Usuário administrador criado:", newUser);
    } else {
      console.log("Usuário administrador já existe.");
    }
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error);
  }
}

// Função que chama as funções de migração e criação de usuário
async function setup() {
  await createTables();
  await createAdminUserIfNotExists();
}

module.exports = setup;

