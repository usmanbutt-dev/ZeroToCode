import { db } from '../firebase';
import { ref, get, update, set } from 'firebase/database';

// XP rewards for each module
const MODULE_XP = {
  module1: 50,
  module2: 75,
  module3: 100,
  module4: 100,
  module5: 125,
  module6: 150,
  module7: 150,
  module8: 200
};

/**
 * Get the current date in YYYY-MM-DD format
 */
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Check if two dates are consecutive days
 */
const isConsecutiveDay = (lastDate, currentDate) => {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

/**
 * Check if the date is today
 */
const isToday = (dateString) => {
  return dateString === getTodayDate();
};

/**
 * Get user progress data from Firebase
 */
export const getUserProgress = async (uid) => {
  if (!uid) return null;
  
  try {
    const userRef = ref(db, 'users/' + uid);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return null;
  }
};

/**
 * Update the user's streak based on their last active date
 * Should be called when user opens the app or completes an activity
 */
export const updateStreak = async (uid) => {
  if (!uid) return 0;
  
  try {
    const userData = await getUserProgress(uid);
    if (!userData) return 0;
    
    const today = getTodayDate();
    const lastActiveDate = userData.lastActiveDate;
    let currentStreak = userData.currentStreak || 0;
    
    // If already active today, just return current streak
    if (lastActiveDate === today) {
      return currentStreak;
    }
    
    // If last active was yesterday, increment streak
    if (lastActiveDate && isConsecutiveDay(lastActiveDate, today)) {
      currentStreak += 1;
    } else if (!lastActiveDate || !isConsecutiveDay(lastActiveDate, today)) {
      // Streak broken or first time
      if (lastActiveDate && !isToday(lastActiveDate)) {
        currentStreak = 1; // Reset to 1 for today
      } else if (!lastActiveDate) {
        currentStreak = 1; // First day
      }
    }
    
    // Update in Firebase
    const userRef = ref(db, 'users/' + uid);
    await update(userRef, {
      currentStreak,
      lastActiveDate: today
    });
    
    return currentStreak;
  } catch (error) {
    console.error("Error updating streak:", error);
    return 0;
  }
};

/**
 * Mark a lesson/module as completed and award XP
 */
export const completeLesson = async (uid, moduleId) => {
  if (!uid || !moduleId) return { success: false };
  
  try {
    const userData = await getUserProgress(uid);
    if (!userData) return { success: false };
    
    // Check if already completed
    const completedLessons = userData.completedLessons || {};
    if (completedLessons[moduleId]) {
      return { success: true, alreadyCompleted: true, xpAwarded: 0 };
    }
    
    // Calculate XP to award
    const xpToAward = MODULE_XP[moduleId] || 50;
    const newXp = (userData.xp || 0) + xpToAward;
    
    // Update completed lessons
    completedLessons[moduleId] = true;
    
    // Also update streak
    const today = getTodayDate();
    let currentStreak = userData.currentStreak || 0;
    const lastActiveDate = userData.lastActiveDate;
    
    if (lastActiveDate !== today) {
      if (lastActiveDate && isConsecutiveDay(lastActiveDate, today)) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }
    
    // Update Firebase
    const userRef = ref(db, 'users/' + uid);
    await update(userRef, {
      completedLessons,
      xp: newXp,
      currentStreak,
      lastActiveDate: today
    });
    
    return { 
      success: true, 
      alreadyCompleted: false, 
      xpAwarded: xpToAward,
      totalXp: newXp,
      newStreak: currentStreak
    };
  } catch (error) {
    console.error("Error completing lesson:", error);
    return { success: false };
  }
};

/**
 * Save notification preferences
 */
export const saveNotificationPrefs = async (uid, notifications) => {
  if (!uid) return false;
  
  try {
    const userRef = ref(db, 'users/' + uid);
    await update(userRef, { notifications });
    return true;
  } catch (error) {
    console.error("Error saving notification preferences:", error);
    return false;
  }
};

/**
 * Get notification preferences
 */
export const getNotificationPrefs = async (uid) => {
  if (!uid) return { email: true, streak: true, progress: false };
  
  try {
    const userData = await getUserProgress(uid);
    return userData?.notifications || { email: true, streak: true, progress: false };
  } catch (error) {
    console.error("Error getting notification preferences:", error);
    return { email: true, streak: true, progress: false };
  }
};
