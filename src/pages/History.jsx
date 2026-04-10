import { useState, useEffect } from 'react';
import { Trash2, Clock, Activity } from 'lucide-react';
import { getHistory, deleteWorkout } from '../utils/storage';
import { useAppContext } from '../context/AppContext';

export default function History() {
  const [history, setHistory] = useState([]);
  const { updateGlobalState } = useAppContext();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this workout?')) {
      const updated = deleteWorkout(id);
      setHistory(updated);
      updateGlobalState();
    }
  };

  const getSportColor = (sport) => {
    switch(sport) {
      case 'Push Up': return '#FF9671';
      case 'Sit Up': return '#48C9B0';
      case 'Squat': return '#9D94FF';
      case 'Plank': return '#F5B041';
      case 'Lari': return '#F1948A';
      default: return '#5DADE2';
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '-';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="animate-pop" style={{ flex: 1, padding: '0 0.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Workout History</h2>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-secondary)' }}>
          <Activity size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
          <p>No workouts yet. Go get some reps!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {history.map(workout => (
            <div key={workout.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${getSportColor(workout.sport)}` }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: getSportColor(workout.sport) }}>{workout.sport}</h3>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ background: '#F7FAFC', padding: '4px 8px', borderRadius: '8px' }}>{formatDate(workout.date)}</span>
                  {workout.reps > 0 && <span>{workout.reps} Reps</span>}
                  {workout.duration > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {formatDuration(workout.duration)}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(workout.id)}
                style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', opacity: 0.7 }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
