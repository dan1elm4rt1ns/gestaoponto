import React, { useState } from 'react';
import { registerPonto } from '../services/pontoService';

function Registro() {
  const [type, setType] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerPonto(type, timestamp);
      setMessage('Ponto registrado com sucesso!');
    } catch (error) {
      setMessage('Erro ao registrar ponto.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro de Ponto</h2>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tipo de Batida</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
              <option value="almoco">Almoço</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Horário</label>
            <input
              type="datetime-local"
              className="w-full p-2 border border-gray-300 rounded"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Registrar Ponto
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
