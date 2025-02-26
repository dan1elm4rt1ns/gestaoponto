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
