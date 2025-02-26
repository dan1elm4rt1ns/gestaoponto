#!/bin/bash

# Criando o diretório src/pages
echo "Criando o diretório src/pages..."
mkdir -p src/pages

# Criando o arquivo Login.jsx
echo "Criando o arquivo Login.jsx..."
cat <<EOL > src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div>
      <h2>Tela de Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
EOL

# Criando o arquivo Dashboard.jsx
echo "Criando o arquivo Dashboard.jsx..."
cat <<EOL > src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getPontos } from '../services/pontoService';

function Dashboard() {
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const data = await getPontos();
        setPontos(data);
      } catch (error) {
        console.error("Erro ao carregar pontos", error);
      }
    };

    fetchPontos();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {pontos.map((ponto) => (
          <li key={ponto.id}>
            Tipo: {ponto.type}, Data: {ponto.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
EOL

# Criando o arquivo Registro.jsx
echo "Criando o arquivo Registro.jsx..."
cat <<EOL > src/pages/Registro.jsx
import React, { useState } from 'react';
import { registerPonto } from '../services/pontoService';

function Registro() {
  const [type, setType] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerPonto(type, timestamp);
      alert('Ponto registrado com sucesso!');
    } catch (err) {
      console.error("Erro ao registrar ponto", err);
    }
  };

  return (
    <div>
      <h2>Registro de Ponto</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Tipo de Ponto" 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          required
        />
        <br />
        <input 
          type="datetime-local" 
          value={timestamp} 
          onChange={(e) => setTimestamp(e.target.value)}
          required
        />
        <br />
        <button type="submit">Registrar Ponto</button>
      </form>
    </div>
  );
}

export default Registro;
EOL

# Criando o arquivo Correcao.jsx
echo "Criando o arquivo Correcao.jsx..."
cat <<EOL > src/pages/Correcao.jsx
import React, { useState } from 'react';
import { corrigirPontos } from '../services/correcaoService';

function Correcao() {
  const [userIds, setUserIds] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [padrao, setPadrao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await corrigirPontos(userIds.split(','), startDate, endDate, padrao);
      alert('Correção de pontos realizada com sucesso!');
    } catch (err) {
      console.error("Erro ao corrigir pontos", err);
    }
  };

  return (
    <div>
      <h2>Correção de Pontos</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="IDs de Usuários (separados por vírgula)" 
          value={userIds} 
          onChange={(e) => setUserIds(e.target.value)}
          required
        />
        <br />
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <br />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <br />
        <input 
          type="text" 
          placeholder="Padrão de Correção" 
          value={padrao} 
          onChange={(e) => setPadrao(e.target.value)}
          required
        />
        <br />
        <button type="submit">Corrigir Pontos</button>
      </form>
    </div>
  );
}

export default Correcao;
EOL

# Integrando as rotas no App.jsx
echo "Atualizando o arquivo App.jsx com as rotas..."
cat <<EOL > src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registro from './pages/Registro';
import Correcao from './pages/Correcao';

function App() {
  // Exemplo simples de proteção de rota (pode ser melhorado com contexto ou Redux)
  const isAuthenticated = localStorage.getItem('token') ? true : false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/registro"
          element={isAuthenticated ? <Registro /> : <Navigate to="/login" />}
        />
        <Route
          path="/correcao"
          element={isAuthenticated ? <Correcao /> : <Navigate to="/login" />}
        />
        {/* Rota default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
EOL

echo "Scripts de integração com as telas criados com sucesso!"

