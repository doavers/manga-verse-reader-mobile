
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const threshold = 80; // Minimum pull distance to trigger refresh

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;
    
    if (distance > 0 && containerRef.current?.scrollTop === 0) {
      // Apply resistance to make the pull feel more natural
      const resistedDistance = Math.min(distance * 0.4, threshold * 1.5);
      setPullDistance(resistedDistance);
      
      // Prevent default scrolling behavior
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling) return;
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
        setIsPulling(false);
      }
    } else {
      // Reset if not pulled far enough
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  // Reset state if component unmounts during refresh
  useEffect(() => {
    return () => {
      setIsRefreshing(false);
      setPullDistance(0);
      setIsPulling(false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        animate={{ 
          y: isRefreshing ? threshold : pullDistance 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30 
        }}
      >
        <div className="pull-to-refresh-indicator" style={{ height: isRefreshing ? threshold : 0 }}>
          {isRefreshing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="text-manga-primary" size={24} />
            </motion.div>
          ) : (
            <motion.div
              style={{ 
                opacity: pullDistance / threshold,
                transform: `rotate(${(pullDistance / threshold) * 270}deg)` 
              }}
            >
              <RefreshCw className="text-manga-primary" size={24} />
            </motion.div>
          )}
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
