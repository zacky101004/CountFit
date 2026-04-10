import { useAppContext } from '../context/AppContext';

export default function ProgressBar() {
  const { todayProgress, settings, currentSport } = useAppContext();
  
  const target = settings.dailyTarget || 100;
  const progressPercent = Math.min((todayProgress / target) * 100, 100);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', width: '100%', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>Daily Goal <span style={{color: '#F39C12'}}>({currentSport})</span></span>
        <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary-accent)' }}>
          {todayProgress} <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>/ {target}</span>
        </span>
      </div>
      
      <div style={{ 
        width: '100%', 
        height: '14px', 
        background: 'rgba(0,0,0,0.05)', 
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #FF9671, #FFC75F, #A3E4D7)',
          borderRadius: '10px',
          transition: 'width 0.5s ease-out',
          boxShadow: '0 0 12px rgba(255, 199, 95, 0.4)'
        }} />
      </div>
    </div>
  );
}
