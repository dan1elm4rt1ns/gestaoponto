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
