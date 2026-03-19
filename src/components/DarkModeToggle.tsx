import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all group"
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
