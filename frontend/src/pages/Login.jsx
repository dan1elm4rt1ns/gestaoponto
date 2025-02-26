import React, { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardData } from '../services/dashboardService';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getDashboardData();
        // Transforme os dados conforme necessário. Exemplo:
        setData([{ label: 'Pontos de Hoje', value: Number(result.totalPontosHoje) }]);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
