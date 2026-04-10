import { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { useAppContext } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { settings } = useAppContext();

  // Theme is strictly single solid theme now

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'history': return <History />;
      case 'dashboard': return <Dashboard />;
      case 'settings': return <Settings />;
      default: return <Home />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
