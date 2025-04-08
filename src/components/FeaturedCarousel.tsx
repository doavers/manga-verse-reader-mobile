
import { useState, useEffect, useCallback } from 'react';
import { Manga } from '../types/manga';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface FeaturedCarouselProps {
  mangas: Manga[];
}

const FeaturedCarousel = ({ mangas }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === mangas.length - 1 ? 0 : prev + 1));
    setImageError(false); // Reset image error state when changing slides
  }, [mangas.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? mangas.length - 1 : prev - 1));
    setImageError(false); // Reset image error state when changing slides
  }, [mangas.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!mangas.length) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="carousel-container">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="carousel-slide"
        >
          <Link to={`/manga/${mangas[currentIndex].id}`}>
            {!imageError ? (
              <img
                src={mangas[currentIndex].cover}
                alt={mangas[currentIndex].title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-manga-dark/50 flex items-center justify-center">
                <ImageOff className="text-manga-accent opacity-50" size={48} />
              </div>
            )}
            <div className="carousel-content">
              <h2 className="text-2xl font-bold">{mangas[currentIndex].title}</h2>
              <p className="text-sm opacity-80 mt-1 line-clamp-2">{mangas[currentIndex].description}</p>
              <div className="flex items-center mt-3">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{mangas[currentIndex].rating}</span>
                <div className="flex ml-4 space-x-2">
                  {mangas[currentIndex].tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="bg-manga-primary/70 text-white text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {mangas.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
              setImageError(false); // Reset image error state when manually changing slides
            }}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
