import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { ref, set, get, onValue } from 'firebase/database';
import { updateStreak } from '../utils/userProgress';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, {
      displayName: name
    });

    // Create user entry in Realtime Database
    const today = new Date().toISOString().split('T')[0];
    await set(ref(db, 'users/' + user.uid), {
      username: name,
      email: email,
      createdAt: new Date().toISOString(),
      currentStreak: 1,
      lastActiveDate: today,
      xp: 0,
      completedLessons: {},
      notifications: { email: true, streak: true, progress: false }
    });

    return user;
  }

  // Login function
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Update streak on login
    if (result.user) {
      await updateStreak(result.user.uid);
    }
    return result;
  }

  // Logout function
  function logout() {
    setUserData(null);
    return signOut(auth);
  }

  // Password reset function
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Refresh user data from Firebase
  async function refreshUserData() {
    if (currentUser) {
      const userRef = ref(db, 'users/' + currentUser.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      }
    }
  }

  // Monitor auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Subscribe to user data changes in real-time
        const userRef = ref(db, 'users/' + user.uid);
        const unsubscribeData = onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          }
        });
        
        // Update streak on app open
        await updateStreak(user.uid);
        
        setLoading(false);
        return () => unsubscribeData();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    resetPassword,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
