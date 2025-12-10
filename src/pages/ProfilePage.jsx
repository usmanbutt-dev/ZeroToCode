import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';
import { 
  User, Mail, Calendar, Flame, Trophy, BookOpen, 
  Code, Edit2, Check, X, Camera, Award, Target,
  TrendingUp, Clock, Zap, Sparkles, Star
} from 'lucide-react';
import { GlassBot, AvatarPicker } from '../components/avatars';

const ProfilePage = () => {
  const { currentUser, userData } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  // Initialize newName from userData
  useEffect(() => {
    if (userData?.username || currentUser?.displayName) {
      setNewName(userData?.username || currentUser?.displayName || '');
    }
  }, [userData, currentUser]);

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    
    try {
      const userRef = ref(db, 'users/' + currentUser.uid);
      await update(userRef, { username: newName.trim() });
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleAvatarSelect = async (avatar) => {
    try {
      const userRef = ref(db, 'users/' + currentUser.uid);
      await update(userRef, { avatar });
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Not Signed In</h2>
          <p className="text-slate-600 dark:text-slate-400">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Current Streak', value: userData?.currentStreak || 0, icon: Flame, color: 'from-orange-400 to-red-500', bgColor: 'bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30', iconBg: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { label: 'Total XP', value: userData?.xp || 0, icon: Zap, color: 'from-yellow-400 to-amber-500', bgColor: 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30', iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-500' },
    { label: 'Lessons Done', value: Object.keys(userData?.completedLessons || {}).length, icon: BookOpen, color: 'from-green-400 to-emerald-500', bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30', iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    { label: 'Days Active', value: Math.floor((Date.now() - new Date(userData?.createdAt).getTime()) / (1000 * 60 * 60 * 24)) || 0, icon: Calendar, color: 'from-blue-400 to-indigo-500', bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30', iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500' },
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first lesson', unlocked: Object.keys(userData?.completedLessons || {}).length > 0, icon: Target, color: 'from-violet-500 to-purple-500' },
    { name: 'Week Warrior', description: 'Maintain a 7-day streak', unlocked: (userData?.currentStreak || 0) >= 7, icon: Flame, color: 'from-orange-500 to-red-500' },
    { name: 'Code Explorer', description: 'Try all 8 modules', unlocked: Object.keys(userData?.completedLessons || {}).length >= 8, icon: Code, color: 'from-emerald-500 to-teal-500' },
    { name: 'XP Hunter', description: 'Earn 500 XP', unlocked: (userData?.xp || 0) >= 500, icon: Trophy, color: 'from-yellow-500 to-amber-500' },
  ];

  const completedLessons = Object.keys(userData?.completedLessons || {}).length;
  const totalLessons = 8;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-50 via-violet-50/30 to-slate-50 dark:from-slate-900 dark:via-violet-900/10 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header - Redesigned */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden mb-8 border border-slate-200/50 dark:border-slate-700/50"
        >
          {/* Decorative gradient strip */}
          <div className="h-3 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-2xl blur-xl opacity-30 scale-110" />
                  
                  <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 flex items-center justify-center border-4 border-white dark:border-slate-700 shadow-xl overflow-hidden">
                    <GlassBot variant={userData?.avatar || 'standard'} size={96} />
                  </div>
                </div>
                
                <motion.button 
                  onClick={() => setIsAvatarPickerOpen(true)}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 rounded-xl flex items-center justify-center border-3 border-white dark:border-slate-800 transition-all shadow-lg shadow-violet-500/30"
                >
                  <Edit2 className="w-4 h-4 text-white" />
                </motion.button>
              </motion.div>
              
              {/* Name & Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="text-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-xl border-2 border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()}
                      />
                      <button 
                        onClick={handleUpdateName}
                        className="p-2 text-white bg-green-500 hover:bg-green-400 rounded-xl transition-colors shadow-lg shadow-green-500/25"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setIsEditingName(false)}
                        className="p-2 text-white bg-red-500 hover:bg-red-400 rounded-xl transition-colors shadow-lg shadow-red-500/25"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {userData?.username || currentUser.displayName}
                      </h1>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="p-1.5 text-slate-400 hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-3">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-full">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Joined {formatDate(userData?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Enhanced with hover effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative ${stat.bgColor} rounded-2xl p-5 shadow-lg border border-white/50 dark:border-slate-700/50 overflow-hidden group cursor-default`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className={`w-11 h-11 ${stat.iconBg} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Achievements</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: achievement.unlocked ? 1.02 : 1 }}
                className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all overflow-hidden ${
                  achievement.unlocked 
                    ? 'border-yellow-400/50 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' 
                    : 'border-slate-200 dark:border-slate-700 opacity-60 grayscale'
                }`}
              >
                {/* Shine effect for unlocked */}
                {achievement.unlocked && (
                  <div className="absolute -inset-full z-0 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_3s_infinite]" />
                )}
                
                <div className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                  achievement.unlocked 
                    ? `bg-gradient-to-br ${achievement.color} shadow-yellow-500/20` 
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  <achievement.icon className={`w-7 h-7 ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <div className="relative z-10 flex-1">
                  <p className={`font-bold ${achievement.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    {achievement.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <div className="relative z-10 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Progress - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Learning Progress</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Keep up the great work!</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Course Completion</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  {progressPercent}%
                </span>
              </div>
              <div className="relative w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                {/* Background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="relative h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full"
                >
                  {/* Progress glow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-violet-500/50" />
                </motion.div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <BookOpen className="w-5 h-5 text-violet-500" />
              <p className="text-slate-600 dark:text-slate-400">
                You've completed <span className="font-bold text-violet-500">{completedLessons}</span> out of <span className="font-bold text-slate-700 dark:text-slate-300">{totalLessons}</span> modules.
                {progressPercent < 100 ? ' Keep going! 🚀' : ' Amazing work! 🎉'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPicker
        isOpen={isAvatarPickerOpen}
        onClose={() => setIsAvatarPickerOpen(false)}
        currentAvatar={userData?.avatar || 'standard'}
        onSelect={handleAvatarSelect}
      />
      
      {/* Shimmer animation styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
