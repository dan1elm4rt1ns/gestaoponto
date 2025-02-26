#!/bin/bash

# Criando a estrutura de diretórios
echo "Criando estrutura de diretórios..."
mkdir -p src/pages

# Criando o arquivo Login.jsx
echo "Criando o arquivo Login.jsx..."
cat <<EOL > src/pages/Login.jsx
import React from 'react';

function Login() {
  return (
    <div>
      <h2>Tela de Login</h2>
      {/* Formulário de Login */}
    </div>
  );
}

export default Login;
EOL

# Criando o arquivo Dashboard.jsx
echo "Criando o arquivo Dashboard.jsx..."
cat <<EOL > src/pages/Dashboard.jsx
import React from 'react';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      {/* Conteúdo do Dashboard */}
    </div>
  );
}

export default Dashboard;
EOL

# Criando o arquivo Registro.jsx
echo "Criando o arquivo Registro.jsx..."
cat <<EOL > src/pages/Registro.jsx
import React from 'react';

function Registro() {
  return (
    <div>
      <h2>Registro</h2>
      {/* Formulário de Registro */}
    </div>
  );
}

export default Registro;
EOL

# Criando o arquivo Correcao.jsx
echo "Criando o arquivo Correcao.jsx..."
cat <<EOL > src/pages/Correcao.jsx
import React from 'react';

function Correcao() {
  return (
    <div>
      <h2>Correção</h2>
      {/* Conteúdo para correção */}
    </div>
  );
}

export default Correcao;
EOL

# Criando o arquivo App.jsx
echo "Criando o arquivo App.jsx..."
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

echo "Estrutura de páginas e App.jsx criados com sucesso!"

