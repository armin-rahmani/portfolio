import React from 'react';
import { motion } from 'framer-motion';
import { Perspective } from '../types';

interface FloatingSwitcherProps {
  perspective: Perspective;
  onToggle: (p: Perspective) => void;
}

export const FloatingSwitcher: React.FC<FloatingSwitcherProps> = ({ perspective, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-neutral-950/90 text-white rounded-full p-1 border border-neutral-700/80 shadow-2xl backdrop-blur-md flex items-center text-[11px] font-medium"
      >
        <button
          onClick={() => onToggle('enterprise')}
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            perspective === 'enterprise'
              ? 'bg-white text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Enterprise
        </button>
        <button
          onClick={() => onToggle('institutional')}
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
            perspective === 'institutional'
              ? 'bg-white text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Institutional
        </button>
      </motion.div>
    </div>
  );
};
