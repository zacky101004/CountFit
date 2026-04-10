import { Home, History, BarChart2, Settings } from 'lucide-react';

export default function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', color: '#3B82F6', pale: '#EFF6FF' },
    { id: 'history', icon: History, label: 'History', color: '#F59E0B', pale: '#FEF3C7' },
    { id: 'dashboard', icon: BarChart2, label: 'Stats', color: '#8B5CF6', pale: '#F3E8FF' },
    { id: 'settings', icon: Settings, label: 'Settings', color: '#10B981', pale: '#D1FAE5' }
  ];

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0.8rem',
      zIndex: 100,
      borderRadius: '20px'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isActive ? item.color : 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <div style={{
              padding: '10px',
              borderRadius: '14px',
              background: isActive ? item.pale : 'transparent',
              color: isActive ? item.color : 'var(--text-muted)'
            }}>
              <Icon size={24} />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '800' : '600', marginTop: '4px' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
