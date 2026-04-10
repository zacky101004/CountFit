import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'countfit_history';
const SETTINGS_KEY = 'countfit_settings';

export const getHistory = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWorkout = (workout) => {
  const history = getHistory();
  const newWorkout = {
    id: uuidv4(),
    date: new Date().toISOString(),
    ...workout
  };
  history.unshift(newWorkout); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newWorkout;
};

export const deleteWorkout = (id) => {
  const history = getHistory();
  const updated = history.filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const getSettings = () => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : { dailyTarget: 100, theme: 'dark' };
};

export const saveSettings = (settings) => {
  const current = getSettings();
  const merged = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
  return merged;
};

export const getTodayProgress = (sport) => {
  const history = getHistory();
  const today = new Date().toDateString();
  return history
    .filter(w => new Date(w.date).toDateString() === today && (sport ? w.sport === sport : true))
    .reduce((acc, curr) => acc + (curr.reps || 0), 0);
};

export const calculateStreak = () => {
  const history = getHistory();
  if (history.length === 0) return 0;

  // Get unique dates
  const dates = [...new Set(history.map(w => new Date(w.date).toDateString()))]
    .map(d => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a); // descending

  let streak = 0;
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 86400000;

  // If no workout today and yesterday, streak is 0
  if (dates[0] !== today && dates[0] !== yesterday) {
    return 0;
  }

  // Count consecutive days
  let expectedDate = dates[0];
  for (const date of dates) {
    if (date === expectedDate) {
      streak++;
      expectedDate -= 86400000; // minus 1 day
    } else {
      break;
    }
  }

  return streak;
};
