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
