import SportSelector from '../components/SportSelector';
import ProgressBar from '../components/ProgressBar';
import Counter from '../components/Counter';
import Timer from '../components/Timer';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { currentSport } = useAppContext();
  
  const isTimerMode = currentSport === 'Plank' || currentSport === 'Lari';

  return (
    <div className="animate-pop" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <SportSelector />
      
      {!isTimerMode && <ProgressBar />}
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isTimerMode ? <Timer /> : <Counter />}
      </div>
    </div>
  );
}
