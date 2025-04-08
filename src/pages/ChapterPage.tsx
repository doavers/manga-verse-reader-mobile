
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock chapter pages
const mockPages = [
  "https://cdn.statically.io/gh/TechAtlasDev/sample-manga-images/main/page1.jpg",
  "https://cdn.statically.io/gh/TechAtlasDev/sample-manga-images/main/page2.jpg",
  "https://cdn.statically.io/gh/TechAtlasDev/sample-manga-images/main/page3.jpg",
  "https://cdn.statically.io/gh/TechAtlasDev/sample-manga-images/main/page4.jpg",
  "https://cdn.statically.io/gh/TechAtlasDev/sample-manga-images/main/page5.jpg"
];

const ChapterPage = () => {
  const { id: mangaId, chapterId } = useParams<{ id: string, chapterId: string }>();
  const [showControls, setShowControls] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageTap = (e: React.MouseEvent) => {
    const width = window.innerWidth;
    const x = e.clientX;
    
    // Tap left side of screen to go back, right side to go forward
    if (x < width / 3) {
      if (currentPage > 0) setCurrentPage(prev => prev - 1);
    } else if (x > width * 2/3) {
      if (currentPage < mockPages.length - 1) setCurrentPage(prev => prev + 1);
    } else {
      setShowControls(prev => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reader area */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        onClick={handlePageTap}
      >
        <motion.img
          key={currentPage}
          src={mockPages[currentPage]}
          alt={`Page ${currentPage + 1}`}
          className="max-h-screen w-auto object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Page indicator */}
        <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm">
          {currentPage + 1} / {mockPages.length}
        </div>
      </div>
      
      {/* Controls overlay */}
      {showControls && (
        <motion.div 
          className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link 
            to={`/manga/${mangaId}`}
            className="bg-white/10 p-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          
          <h2 className="text-center font-medium">Chapter {chapterId}</h2>
          
          <button className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
            <Menu size={20} />
          </button>
        </motion.div>
      )}
      
      {/* Page navigation indicators (subtle) */}
      {showControls && (
        <>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-50">
            {currentPage > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.5, x: 0 }}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
              >
                <ArrowLeft size={20} />
              </motion.div>
            )}
          </div>
          
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-50">
            {currentPage < mockPages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0.5, x: 0 }}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
              >
                <ArrowLeft size={20} className="transform rotate-180" />
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterPage;
