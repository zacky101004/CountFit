import { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { saveWorkout } from '../utils/storage';

export default function Timer() {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const { currentSport, updateGlobalState } = useAppContext();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleFinish = () => {
    if (time === 0) return;
    
    saveWorkout({
      sport: currentSport,
      reps: 0,
      duration: time // stored in seconds
    });
    
    updateGlobalState();
    setIsRunning(false);
    setTime(0);
    alert(`Great job! You finished ${formatTime(time)} of ${currentSport}!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      
      <div 
        className="glass-panel"
        style={{
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: isRunning ? '0 10px 40px rgba(16, 185, 129, 0.4)' : 'var(--counter-shadow)',
          border: `2px solid ${isRunning ? 'rgba(16, 185, 129, 0.5)' : 'var(--counter-border)'}`,
          background: 'var(--counter-bg)',
          transition: 'all 0.3s'
        }}
      >
        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {currentSport} Timer
        </span>
        <span style={{ fontSize: '4.5rem', fontWeight: '800', fontFamily: 'monospace', color: isRunning ? 'var(--success-color)' : 'var(--text-primary)' }}>
          {formatTime(time)}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`} 
          onClick={toggleTimer}
          style={{ padding: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
        </button>

        {time > 0 && !isRunning && (
          <button 
            className="btn btn-secondary animate-pop" 
            onClick={() => { setIsRunning(false); setTime(0); }}
            style={{ padding: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}
          >
            <Square size={24} />
          </button>
        )}
      </div>

      {time > 0 && !isRunning && (
        <button className="btn btn-primary animate-pop" onClick={handleFinish} style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}>
          Save Workout
        </button>
      )}
    </div>
  );
}
