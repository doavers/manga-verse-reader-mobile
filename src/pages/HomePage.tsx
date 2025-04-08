
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import FeaturedCarousel from '../components/FeaturedCarousel';
import MangaCard from '../components/MangaCard';
import PullToRefresh from '../components/PullToRefresh';
import InfiniteScroll from '../components/InfiniteScroll';
import { 
  getFeaturedManga, 
  getNewManga, 
  getPopularManga, 
  getMangaList 
} from '../services/mangaService';
import { Manga } from '../types/manga';
import { Search } from 'lucide-react';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [mangas, setMangas] = useState<Manga[]>([]);
  
  const { data: featuredMangas = [], refetch: refetchFeatured } = useQuery({
    queryKey: ['featuredMangas'],
    queryFn: getFeaturedManga
  });
  
  const { data: newMangas = [], refetch: refetchNew } = useQuery({
    queryKey: ['newMangas'],
    queryFn: getNewManga
  });
  
  const { data: popularMangas = [], refetch: refetchPopular } = useQuery({
    queryKey: ['popularMangas'],
    queryFn: getPopularManga
  });
  
  const { 
    data: mangaPage = [], 
    isLoading, 
    refetch: refetchMangas 
  } = useQuery({
    queryKey: ['mangas', page],
    queryFn: () => getMangaList(page)
  });

  useEffect(() => {
    if (mangaPage.length > 0) {
      if (page === 1) {
        setMangas(mangaPage);
      } else {
        setMangas(prev => [...prev, ...mangaPage]);
      }
    }
  }, [mangaPage, page]);

  const handleRefresh = async () => {
    setPage(1);
    await Promise.all([
      refetchFeatured(),
      refetchNew(),
      refetchPopular(),
      refetchMangas()
    ]);
  };

  const loadMore = async () => {
    setPage(prev => prev + 1);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="pb-16">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-manga-primary">MangaVerse</h1>
          <button 
            className="p-2 rounded-full bg-manga-primary/10 text-manga-primary"
            onClick={() => window.location.href = '/search'}
          >
            <Search size={20} />
          </button>
        </div>

        {/* Featured Manga Carousel */}
        {featuredMangas.length > 0 && (
          <div className="px-4 mb-6">
            <FeaturedCarousel mangas={featuredMangas} />
          </div>
        )}

        {/* New Releases */}
        {newMangas.length > 0 && (
          <div className="mb-6">
            <div className="px-4 mb-2 flex justify-between items-center">
              <h2 className="text-lg font-bold">New Releases</h2>
              <a href="/new" className="text-sm text-manga-primary">See All</a>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex px-4 space-x-3">
                {newMangas.map((manga, index) => (
                  <div key={manga.id} className="w-32 flex-shrink-0">
                    <MangaCard manga={manga} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Popular Manga */}
        {popularMangas.length > 0 && (
          <div className="mb-6">
            <div className="px-4 mb-2 flex justify-between items-center">
              <h2 className="text-lg font-bold">Popular Now</h2>
              <a href="/popular" className="text-sm text-manga-primary">See All</a>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex px-4 space-x-3">
                {popularMangas.map((manga, index) => (
                  <div key={manga.id} className="w-32 flex-shrink-0">
                    <MangaCard manga={manga} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Manga */}
        <div>
          <div className="px-4 mb-2">
            <h2 className="text-lg font-bold">Library</h2>
          </div>
          <div className="px-4">
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={mangaPage.length > 0}
              isLoading={isLoading}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mangas.map((manga, index) => (
                  <MangaCard key={`${manga.id}-${index}`} manga={manga} index={index} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
};

export default HomePage;
