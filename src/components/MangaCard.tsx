
import React, { useState } from 'react';
import { Manga } from '../types/manga';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';

interface MangaCardProps {
  manga: Manga;
  index?: number;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga, index = 0 }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link to={`/manga/${manga.id}`} className="manga-card block">
        <div className="relative">
          {!imageError ? (
            <img 
              src={manga.cover} 
              alt={manga.title} 
              className="manga-card-image w-full h-64 object-cover rounded-md"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="manga-card-image w-full h-64 bg-manga-dark/50 flex items-center justify-center rounded-md">
              <ImageOff className="text-manga-accent opacity-50" size={32} />
            </div>
          )}
          
          <div className="manga-card-content p-2">
            <h3 className="font-bold truncate">{manga.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm ml-1">{manga.rating}</span>
              <span className="text-xs ml-2 opacity-80">{manga.chapters} chapters</span>
            </div>
          </div>
          {manga.isNew && (
            <div className="absolute top-2 right-2 bg-manga-accent text-white text-xs px-2 py-1 rounded-full">
              NEW
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default MangaCard;
