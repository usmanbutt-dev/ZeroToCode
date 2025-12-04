const STORAGE_KEY = 'zerotocode_progress';

export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { streak: 0, lastLogin: null, modules: {} };
  } catch (e) {
    console.error('Error reading progress:', e);
    return { streak: 0, lastLogin: null, modules: {} };
  }
};

export const saveProgress = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

export const updateStreak = () => {
  const data = getProgress();
  const today = new Date().toDateString();
  
  if (data.lastLogin !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (data.lastLogin === yesterday.toDateString()) {
      data.streak += 1;
    } else {
      data.streak = 1; // Reset if missed a day, or start new
    }
    data.lastLogin = today;
    saveProgress(data);
  }
  return data.streak;
};

export const markModuleComplete = (moduleId) => {
  const data = getProgress();
  if (!data.modules[moduleId]) {
    data.modules[moduleId] = { completed: true, date: new Date().toISOString() };
    saveProgress(data);
  }
};

export const getModuleProgress = (moduleId) => {
  const data = getProgress();
  return data.modules[moduleId] ? 100 : 0;
};
