
import { Home, BookOpen, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-manga-dark border-t border-border z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="grid grid-cols-4 h-16">
        <Link to="/" className="flex flex-col items-center justify-center">
          <div className={`p-1 ${isActive('/') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            <Home size={24} />
          </div>
          <span className={`text-xs ${isActive('/') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            Home
          </span>
        </Link>
        
        <Link to="/library" className="flex flex-col items-center justify-center">
          <div className={`p-1 ${isActive('/library') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            <BookOpen size={24} />
          </div>
          <span className={`text-xs ${isActive('/library') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            Library
          </span>
        </Link>
        
        <Link to="/search" className="flex flex-col items-center justify-center">
          <div className={`p-1 ${isActive('/search') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            <Search size={24} />
          </div>
          <span className={`text-xs ${isActive('/search') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            Search
          </span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center justify-center">
          <div className={`p-1 ${isActive('/profile') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            <User size={24} />
          </div>
          <span className={`text-xs ${isActive('/profile') ? 'text-manga-primary' : 'text-foreground/60'}`}>
            Profile
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
