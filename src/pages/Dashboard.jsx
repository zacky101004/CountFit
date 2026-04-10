import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getHistory } from '../utils/storage';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Compute Last 7 Days Total Reps
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });

  const repsPerDay = last7Days.map(dateStr => {
    return history
      .filter(w => new Date(w.date).toDateString() === dateStr)
      .reduce((acc, curr) => acc + (curr.reps || 0), 0);
  });

  const chartData = {
    labels: last7Days.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Total Reps',
        data: repsPerDay,
        backgroundColor: ['#FF9671', '#FFC75F', '#A3E4D7', '#9D94FF', '#FF9671', '#FFC75F', '#A3E4D7'],
        borderRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Last 7 Days Reps',
        color: '#94A3B8'
      },
    },
    scales: {
      y: { ticks: { color: '#718096' }, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { ticks: { color: '#718096' }, grid: { display: false } }
    }
  };

  const totalWorkouts = history.length;
  const totalReps = history.reduce((acc, w) => acc + (w.reps || 0), 0);
  const totalSeconds = history.reduce((acc, w) => acc + (w.duration || 0), 0);

  return (
    <div className="animate-pop" style={{ flex: 1 }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Statistics</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Reps</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{totalReps}</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Workouts</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{totalWorkouts}</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', gridColumn: 'span 2' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Time</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {Math.floor(totalSeconds / 60)} mins
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1rem' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
