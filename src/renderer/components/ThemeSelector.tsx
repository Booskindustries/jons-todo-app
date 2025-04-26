import React from 'react';
import { Button } from '@/components/ui/button';

const ThemeSelector = () => {
  const handleThemeChange = (theme: string) => {
    document.documentElement.className = theme; // Update the theme class on <html>
    localStorage.setItem('theme', theme); // Save the theme to localStorage
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = savedTheme; // Apply saved theme on load
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Select Theme</h3>
      <div className="flex space-x-2">
        <Button
          onClick={() => handleThemeChange('light')}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Light
        </Button>
        <Button
          onClick={() => handleThemeChange('dark')}
          className="p-2 rounded bg-gray-800 text-white hover:bg-gray-700"
        >
          Dark
        </Button>
        <Button
          onClick={() => handleThemeChange('rose')}
          className="p-2 rounded bg-pink-500 text-white hover:bg-pink-600"
        >
          Rose
        </Button>
        <Button
          onClick={() => handleThemeChange('green')}
          className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Green
          </Button>
      </div>
    </div>
  );
};

export default ThemeSelector;