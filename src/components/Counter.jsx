import { useState, useRef } from 'react';
import { Minus, RotateCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { saveWorkout } from '../utils/storage';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const { currentSport, updateGlobalState } = useAppContext();
  const buttonRef = useRef(null);

  const handleIncrement = () => {
    // Mobile Haptic Feedback
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    
    // Sound feedback
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});

    // Visual feedback
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.style.transform = 'scale(1)';
      }, 100);
    }

    if (count === 0) setStartTime(Date.now());
    setCount(c => c + 1);
  };

  const handleDecrement = () => {
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(20);
    if (count > 0) setCount(c => c - 1);
  };

  const handleFinish = () => {
    if (count === 0) return;

    const duration = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    
    saveWorkout({
      sport: currentSport,
      reps: count,
      duration: duration
    });
    
    updateGlobalState(); // Update context stats
    setCount(0);
    setStartTime(null);

    // Gamification level up alert placeholder
    alert(`Great job! You finished ${count} reps of ${currentSport}!`);
  };

  const handleReset = () => {
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate([20, 50, 20]);
    setCount(0);
    setStartTime(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      
      <div 
        ref={buttonRef}
        onClick={handleIncrement}
        className="glass-panel"
        style={{
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--counter-shadow)',
          background: 'var(--counter-bg)',
          border: '2px solid var(--counter-border)',
          transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--success-color)', textTransform: 'uppercase', letterSpacing: '3px' }}>
          TAP TO COUNT
        </span>
        <span style={{ fontSize: '5.5rem', fontWeight: '800', color: '#FFFFFF' }}>
          {count}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', width: '100%', justifyContent: 'center' }}>
        <button className="btn btn-secondary" onClick={handleDecrement} style={{ padding: '1rem', borderRadius: '50%', background: '#E3F2FD', color: '#3B82F6', width: '64px', height: '64px', border: 'none', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.2)' }}>
          <Minus size={28} strokeWidth={3} />
        </button>
        <button className="btn btn-danger" onClick={handleReset} style={{ padding: '1rem', borderRadius: '50%', background: '#FFF0F0', color: '#E53E3E', width: '64px', height: '64px', border: 'none', boxShadow: '0 8px 20px rgba(229, 62, 62, 0.2)' }}>
          <RotateCcw size={28} strokeWidth={3} />
        </button>
      </div>

      {count > 0 && (
        <button className="btn btn-primary animate-pop" onClick={handleFinish} style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}>
          Save Workout
        </button>
      )}

    </div>
  );
}
