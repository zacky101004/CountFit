import React, { createContext, useContext, useState, useEffect } from 'react';
import * as storage from '../utils/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentSport, setCurrentSport] = useState('Push Up');
  const [streak, setStreak] = useState(0);
  const [settings, setSettings] = useState(storage.getSettings());
  const [todayProgress, setTodayProgress] = useState(0);

  // Initial load
  useEffect(() => {
    updateGlobalState();
  }, [currentSport]);

  const updateGlobalState = () => {
    setStreak(storage.calculateStreak());
    setTodayProgress(storage.getTodayProgress(currentSport));
  };

  const updateSettings = (newSettings) => {
    storage.saveSettings(newSettings);
    setSettings(storage.getSettings());
  };

  return (
    <AppContext.Provider value={{
      currentSport, setCurrentSport,
      streak, updateGlobalState,
      settings, updateSettings,
      todayProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
