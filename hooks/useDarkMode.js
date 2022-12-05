import { useState, useEffect } from 'react';

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('darkMode');
    if (storedValue) {
      setDarkMode(storedValue === 'true');
    }
  }, []);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  }

  return { darkMode, toggleDarkMode };
}

export default useDarkMode;
