import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsBrightnessHighFill, BsCircleHalf } from 'react-icons/bs';

const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode); 
  };

  const containerBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const switchBg = isDarkMode ? 'bg-indigo-600' : 'bg-white';
  const iconColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';

  return (
    <div
      onClick={toggleTheme}
      className={`relative flex items-center w-20 h-10 p-1 rounded-full cursor-pointer transition-colors duration-300 ${containerBg}`}
    >
      <motion.div
        className={`absolute w-8 h-8 rounded-full shadow-md ${switchBg}`}
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 25
        }}
        animate={{ x: isDarkMode ? 'calc(100% + 4px)' : '4px', rotate: isDarkMode ? 360 : 0 }}
      />
      <div className="relative flex justify-around w-full">
        <motion.div
          animate={{ opacity: isDarkMode ? 0 : 1, scale: isDarkMode ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
          className={`z-10 ${iconColor}`}
        >
          <BsBrightnessHighFill size={20} />
        </motion.div>
        <motion.div
          animate={{ opacity: isDarkMode ? 1 : 0, scale: isDarkMode ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className={`z-10 ${iconColor}`}
        >
          <BsCircleHalf size={20} />
        </motion.div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
