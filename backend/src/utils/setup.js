const pool = require('./db');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// Função para criar as tabelas caso não existam
async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

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
    const email = "admin@example.com";
    const password = "adm1npwd";
    const existingUser = await User.findByEmail(email);

    if (!existingUser) {
      const newUser = await User.create({
        name: "Admin",
        email,
        password
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
