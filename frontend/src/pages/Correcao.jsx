import React, { useState } from 'react';
import { corrigirPontos } from '../services/correcaoService';

function Correcao() {
  const [userIds, setUserIds] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [padraoEntrada, setPadraoEntrada] = useState('');
  const [padraoSaidaAlmoco, setPadraoSaidaAlmoco] = useState('');
  const [padraoRetornoAlmoco, setPadraoRetornoAlmoco] = useState('');
  const [padraoSaida, setPadraoSaida] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Converte a string de IDs para um array de números (se informado)
    const userIdsArray = userIds ? userIds.split(',').map(id => Number(id.trim())) : [];
    const padrao = {
      entrada: padraoEntrada,
      saida_almoco: padraoSaidaAlmoco,
      retorno_almoco: padraoRetornoAlmoco,
      saida: padraoSaida
    };
    try {
      await corrigirPontos(userIdsArray, startDate, endDate, padrao);
      setMessage('Correção aplicada com sucesso!');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao aplicar correção.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Correção em Massa</h2>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">IDs dos Usuários (separados por vírgula, deixe vazio para todos)</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ex: 1,2,3"
              value={userIds}
              onChange={(e) => setUserIds(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Data Início</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Data Fim</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Horário de Entrada</label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={padraoEntrada}
              onChange={(e) => setPadraoEntrada(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Horário de Saída para Almoço</label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={padraoSaidaAlmoco}
              onChange={(e) => setPadraoSaidaAlmoco(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Horário de Retorno do Almoço</label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={padraoRetornoAlmoco}
              onChange={(e) => setPadraoRetornoAlmoco(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Horário de Saída</label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={padraoSaida}
              onChange={(e) => setPadraoSaida(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Aplicar Correção
          </button>
        </form>
      </div>
    </div>
  );
}

export default Correcao;
