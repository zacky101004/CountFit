import { Flame } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const { streak } = useAppContext();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '16px',
          background: 'var(--primary-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '800',
          fontSize: '22px',
          boxShadow: 'var(--btn-shadow)'
        }}>
          C
        </div>
        <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.6rem', color: 'var(--text-primary)' }}>
          CountFit
        </h1>
      </div>

      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        color: '#E67E22',
        fontWeight: '800',
        background: '#FFF5E6',
        borderRadius: '20px'
      }}>
        <Flame size={20} fill="#E67E22" strokeWidth={0} />
        <span style={{ color: '#E67E22' }}>{streak} Days</span>
      </div>
    </header>
  );
}
