import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen, FileText, Image, Music, ChevronRight, Home } from 'lucide-react';

const FileExplorerSim = () => {
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [selectedItem, setSelectedItem] = useState(null);

  const fileSystem = {
    'Home': {
      type: 'folder',
      children: ['Documents', 'Pictures', 'Music']
    },
    'Documents': {
      type: 'folder',
      parent: 'Home',
      children: ['homework.txt', 'notes.txt', 'School']
    },
    'Pictures': {
      type: 'folder',
      parent: 'Home',
      children: ['vacation.jpg', 'selfie.jpg']
    },
    'Music': {
      type: 'folder',
      parent: 'Home',
      children: ['song1.mp3', 'song2.mp3']
    },
    'School': {
      type: 'folder',
      parent: 'Documents',
      children: ['math.txt', 'science.txt']
    },
    'homework.txt': { type: 'file', icon: 'text', parent: 'Documents' },
    'notes.txt': { type: 'file', icon: 'text', parent: 'Documents' },
    'math.txt': { type: 'file', icon: 'text', parent: 'School' },
    'science.txt': { type: 'file', icon: 'text', parent: 'School' },
    'vacation.jpg': { type: 'file', icon: 'image', parent: 'Pictures' },
    'selfie.jpg': { type: 'file', icon: 'image', parent: 'Pictures' },
    'song1.mp3': { type: 'file', icon: 'music', parent: 'Music' },
    'song2.mp3': { type: 'file', icon: 'music', parent: 'Music' },
  };

  const currentFolder = currentPath[currentPath.length - 1];
  const currentItems = fileSystem[currentFolder]?.children || [];

  const getIcon = (name) => {
    const item = fileSystem[name];
    if (!item) return <FileText size={20} />;
    if (item.type === 'folder') return selectedItem === name ? <FolderOpen size={20} /> : <Folder size={20} />;
    if (item.icon === 'image') return <Image size={20} />;
    if (item.icon === 'music') return <Music size={20} />;
    return <FileText size={20} />;
  };

  const handleItemClick = (name) => {
    setSelectedItem(name);
    const item = fileSystem[name];
    if (item?.type === 'folder') {
      setTimeout(() => {
        setCurrentPath([...currentPath, name]);
        setSelectedItem(null);
      }, 300);
    }
  };

  const goBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const goHome = () => {
    setCurrentPath(['Home']);
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Folder size={20} className="text-amber-400" />
          File Explorer
        </h3>
      </div>

      {/* Breadcrumb */}
      <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 flex items-center gap-1 text-sm">
        <button onClick={goHome} className="text-slate-400 hover:text-white transition-colors">
          <Home size={16} />
        </button>
        {currentPath.map((folder, index) => (
          <React.Fragment key={folder}>
            <ChevronRight size={14} className="text-slate-600" />
            <span className={index === currentPath.length - 1 ? 'text-white font-medium' : 'text-slate-400'}>
              {folder}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* File List */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-2">
          {currentPath.length > 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goBack}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-500 transition-colors text-left flex items-center gap-3"
            >
              <Folder size={24} className="text-slate-400" />
              <span className="text-slate-400">..</span>
            </motion.button>
          )}
          <AnimatePresence mode="popLayout">
            {currentItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleItemClick(item)}
                className={`p-3 rounded-lg border transition-all text-left flex items-center gap-3 ${
                  selectedItem === item
                    ? 'bg-blue-600/20 border-blue-500'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
                }`}
              >
                <span className={fileSystem[item]?.type === 'folder' ? 'text-amber-400' : 'text-blue-400'}>
                  {getIcon(item)}
                </span>
                <span className="text-white text-sm truncate">{item}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-xs text-slate-400 text-center">
          Click folders to open them. Files are stored inside folders!
        </p>
      </div>
    </div>
  );
};

export default FileExplorerSim;
