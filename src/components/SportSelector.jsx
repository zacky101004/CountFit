import { ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

const SPORTS = ['Push Up', 'Sit Up', 'Squat', 'Plank', 'Lari', 'Custom'];

export default function SportSelector() {
  const { currentSport, setCurrentSport } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleSelect = (sport) => {
    setCurrentSport(sport);
    setIsOpen(false);
  };

  const handleCustomSubmit = (e) => {
    if (e.key === 'Enter' && customInput.trim()) {
      setCurrentSport(customInput.trim());
      setIsOpen(false);
      setCustomInput('');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '2rem' }}>
      <button 
        className="glass-card"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          border: 'none',
          color: 'var(--primary-accent)',
          fontSize: '1.5rem',
          fontWeight: '800',
          cursor: 'pointer'
        }}
      >
        <span>{currentSport}</span>
        <ChevronDown size={28} strokeWidth={3} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
      </button>

      {isOpen && (
        <div className="glass-card animate-slide" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          padding: '0.75rem',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {SPORTS.map(sport => (
            <div 
              key={sport}
              onClick={() => sport !== 'Custom' ? handleSelect(sport) : null}
              style={{
                padding: '1rem',
                borderRadius: '16px',
                cursor: sport !== 'Custom' ? 'pointer' : 'default',
                background: currentSport === sport ? '#FFF0E6' : 'transparent',
                fontWeight: currentSport === sport ? '800' : '600',
                fontSize: '1.2rem',
                color: currentSport === sport ? 'var(--primary-accent)' : 'var(--text-secondary)'
              }}
            >
              {sport !== 'Custom' ? sport : (
                <input 
                  type="text" 
                  placeholder="Custom Workout... (Enter)"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={handleCustomSubmit}
                  style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-color)' }}
                  onClick={e => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
