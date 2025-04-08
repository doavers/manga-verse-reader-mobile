
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMangaById, getChaptersByMangaId } from '../services/mangaService';
import { motion } from 'framer-motion';
import { ArrowLeft, ImageOff } from 'lucide-react';

const MangaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const mangaId = Number(id);
  const [coverImageError, setCoverImageError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const handleCoverImageError = () => {
    setCoverImageError(true);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const { data: manga, isLoading: isLoadingManga } = useQuery({
    queryKey: ['manga', mangaId],
    queryFn: () => getMangaById(mangaId),
    enabled: !!mangaId && !isNaN(mangaId)
  });

  const { data: chapters = [], isLoading: isLoadingChapters } = useQuery({
    queryKey: ['chapters', mangaId],
    queryFn: () => getChaptersByMangaId(mangaId),
    enabled: !!mangaId && !isNaN(mangaId)
  });

  useEffect(() => {
    if (manga) {
      document.title = `${manga.title} | MangaVerse`;
    }
    return () => {
      document.title = 'MangaVerse';
    };
  }, [manga]);

  if (isLoadingManga) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-manga-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">Manga not found</h2>
        <Link to="/" className="text-manga-primary mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Header with cover image */}
      <div className="relative h-72">
        <div className="absolute inset-0">
          {!coverImageError ? (
            <img 
              src={manga.cover} 
              alt={manga.title} 
              className="w-full h-full object-cover"
              onError={handleCoverImageError}
            />
          ) : (
            <div className="w-full h-full bg-manga-dark/50 flex items-center justify-center">
              <ImageOff className="text-manga-accent opacity-50" size={48} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        
        <div className="absolute top-4 left-4">
          <Link 
            to="/" 
            className="bg-background/30 backdrop-blur-sm p-2 rounded-full text-white"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 flex">
          <div className="w-28 h-40 overflow-hidden rounded-lg shadow-lg">
            {!thumbnailError ? (
              <img 
                src={manga.cover} 
                alt={manga.title} 
                className="w-full h-full object-cover"
                onError={handleThumbnailError}
              />
            ) : (
              <div className="w-full h-full bg-manga-dark/50 flex items-center justify-center">
                <ImageOff className="text-manga-accent opacity-50" size={24} />
              </div>
            )}
          </div>
          
          <div className="ml-4 flex flex-col justify-end">
            <h1 className="text-2xl font-bold">{manga.title}</h1>
            <p className="text-sm opacity-80">By {manga.author}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{manga.rating}</span>
              <span className="mx-2">•</span>
              <span>{manga.chapters} chapters</span>
            </div>
            <div className="flex flex-wrap mt-2 gap-2">
              {manga.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-manga-primary/20 text-manga-primary px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Synopsis</h2>
        <p className="text-sm opacity-80">{manga.description}</p>
      </div>
      
      {/* Chapters List */}
      <div className="mt-4">
        <div className="px-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Chapters</h2>
          <span className="text-sm opacity-70">{chapters.length} chapters</span>
        </div>
        
        {isLoadingChapters ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-manga-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="mt-2">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/manga/${mangaId}/chapter/${chapter.id}`}
                  className="flex items-center justify-between p-4 border-b border-border hover:bg-muted transition-colors"
                >
                  <div>
                    <h3 className="font-medium">Chapter {chapter.number}</h3>
                    <p className="text-sm opacity-70">{chapter.title}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs opacity-70">
                      {new Date(chapter.releaseDate).toLocaleDateString()}
                    </span>
                    {chapter.isRead && (
                      <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                        Read
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MangaDetailPage;
