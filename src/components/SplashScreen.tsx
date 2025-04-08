
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onFinish, 500); // Wait for exit animation to complete
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-manga-dark z-50"
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: 0,
            ease: "easeInOut"
          }}
          className="mb-4"
        >
          <div className="w-32 h-32 mx-auto bg-manga-primary rounded-2xl flex items-center justify-center">
            <span className="text-white text-4xl font-bold">MV</span>
          </div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-3xl font-bold text-white"
        >
          MangaVerse
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-manga-light mt-2"
        >
          Your Manga Universe
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
