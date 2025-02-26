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
