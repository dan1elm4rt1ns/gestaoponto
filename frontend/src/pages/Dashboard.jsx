// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Chart from 'chart.js/auto';

function Dashboard() {
  const [data, setData] = useState([
    { date: '2025-02-20', value: 10 },
    { date: '2025-02-21', value: 15 },
    { date: '2025-02-22', value: 7 },
    { date: '2025-02-23', value: 12 },
    { date: '2025-02-24', value: 20 },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (err) {
        setError('Erro ao buscar dados do dashboard');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: 'Registros de Ponto',
            data: data.map((d) => d.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default Dashboard;
