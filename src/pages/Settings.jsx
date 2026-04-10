import { useState } from 'react';
import { Moon, Sun, Target, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Settings() {
  const { settings, updateSettings, currentSport } = useAppContext();
  
  const [target, setTarget] = useState(settings.dailyTarget || 100);

  const handleSaveTarget = () => {
    updateSettings({ dailyTarget: Number(target) });
    alert('Target updated!');
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
    window.location.reload(); // Temporary fix to apply root CSS variables instantly
  };

  const handleNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('CountFit', {
            body: 'Notifications are now enabled! We will remind you to workout.',
            icon: '/vite.svg'
          });
        }
      });
    }
  };

  return (
    <div className="animate-pop" style={{ flex: 1, padding: '0 0.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Settings</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Daily Target */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Target size={20} color="var(--primary-accent)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Daily Target ({currentSport})</h3>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="number" 
              value={target}
              onChange={e => setTarget(e.target.value)}
              style={{ flex: 1, background: 'var(--bg-color)' }}
            />
            <button className="btn btn-primary" onClick={handleSaveTarget}>
              Save
            </button>
          </div>
        </div>



        {/* Notifications */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--success-color)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Reminders</h3>
          </div>
          <button className="btn btn-secondary" onClick={handleNotification}>
            Enable
          </button>
        </div>

      </div>
    </div>
  );
}
